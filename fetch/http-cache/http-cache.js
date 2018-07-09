/* global btoa fetch token promise_test step_timeout */
/* global assert_equals assert_true assert_false assert_own_property assert_throws assert_unreached assert_less_than */

var templates = {
  'fresh': {
    'response_headers': [
      ['Expires', http_date(100000)],
      ['Last-Modified', http_date(0)]
    ]
  },
  'stale': {
    'response_headers': [
      ['Expires', http_date(-5000)],
      ['Last-Modified', http_date(-100000)]
    ]
  },
  'lcl_response': {
    'response_headers': [
      ['Location', 'location_target'],
      ['Content-Location', 'content_location_target']
    ]
  },
  'location': {
    'query_arg': 'location_target',
    'response_headers': [
      ['Expires', http_date(100000)],
      ['Last-Modified', http_date(0)]
    ]
  },
  'content_location': {
    'query_arg': 'content_location_target',
    'response_headers': [
      ['Expires', http_date(100000)],
      ['Last-Modified', http_date(0)]
    ]
  }
}

function makeTest (test) {
  return function () {
    var uuid = token()
    var requests = expandTemplates(test)
    var fetchFunctions = []
    for (let i = 0; i < requests.length; ++i) {
      fetchFunctions.push({
        code: function (idx) {
          var config = requests[idx]
          var url = makeTestUrl(uuid, config)
          var init = fetchInit(requests, config)
          return fetch(url, init)
            .then(makeCheckResponse(idx, config))
            .then(makeCheckResponseBody(config, uuid), function (reason) {
              if ('expected_type' in config && config.expected_type === 'error') {
                assert_throws(new TypeError(), function () { throw reason })
              } else {
                throw reason
              }
            })
        },
        pauseAfter: 'pause_after' in requests[i]
      })
    }
    var idx = 0
    function runNextStep () {
      if (fetchFunctions.length) {
        var nextFetchFunction = fetchFunctions.shift()
        if (nextFetchFunction.pauseAfter === true) {
          return nextFetchFunction.code(idx++)
            .then(pause)
            .then(runNextStep)
        } else {
          return nextFetchFunction.code(idx++)
            .then(runNextStep)
        }
      } else {
        return Promise.resolve()
      }
    }

    return runNextStep()
      .then(function () {
        return getServerState(uuid)
      }).then(function (testState) {
        checkRequests(requests, testState)
        return Promise.resolve()
      })
  }
}

function expandTemplates (test) {
  var rawRequests = test.requests
  var requests = []
  for (let i = 0; i < rawRequests.length; i++) {
    var request = rawRequests[i]
    request.name = test.name
    if ('template' in request) {
      var template = templates[request['template']]
      for (let member in template) {
        if (!request.hasOwnProperty(member)) {
          request[member] = template[member]
        }
      }
    }
    if ('expected_type' in request && request.expected_type === 'cached') {
      // requests after one that's expected to be cached will get out of sync
      // with the server; not currently supported.
      if (rawRequests.length > i + 1) {
        assert_unreached('Making requests after something is expected to be cached.')
      }
    }
    requests.push(request)
  }
  return requests
}

function fetchInit (requests, config) {
  var init = {
    'headers': []
  }
  if ('request_method' in config) init.method = config['request_method']
  if ('request_headers' in config) init.headers = config['request_headers']
  if ('name' in config) init.headers.push(['Test-Name', config.name])
  if ('request_body' in config) init.body = config['request_body']
  if ('mode' in config) init.mode = config['mode']
  if ('credentials' in config) init.mode = config['credentials']
  if ('cache' in config) init.cache = config['cache']
  init.headers.push(['Test-Requests', btoa(JSON.stringify(requests))])
  return init
}

function makeCheckResponse (idx, config) {
  return function checkResponse (response) {
    var reqNum = idx + 1
    var resNum = parseInt(response.headers.get('Server-Request-Count'))
    if ('expected_type' in config) {
      if (config.expected_type === 'error') {
        assert_true(false, `Request ${reqNum} doesn't throw an error`)
        return response.text()
      }
      if (config.expected_type === 'cached') {
        assert_less_than(resNum, reqNum, `Response ${reqNum} does not come from cache`)
      }
      if (config.expected_type === 'not_cached') {
        assert_equals(resNum, reqNum, `Response ${reqNum} comes from cache`)
      }
    }
    if ('expected_status' in config) {
      assert_equals(response.status, config.expected_status,
        `Response ${reqNum} status is ${response.status}, not ${config.expected_status}`)
    } else if ('response_status' in config) {
      assert_equals(response.status, config.response_status[0],
        `Response ${reqNum} status is ${response.status}, not ${config.response_status[0]}`)
    } else {
      assert_equals(response.status, 200, `Response ${reqNum} status is ${response.status}, not 200`)
    }
    if ('response_headers' in config) {
      config.response_headers.forEach(function (header) {
        if (header.len < 3 || header[2] === true) {
          assert_equals(response.headers.get(header[0]), header[1],
            `Response ${reqNum} header ${header[0]} is "${response.headers.get(header[0])}", not "${header[1]}"`)
        }
      })
    }
    if ('expected_response_headers' in config) {
      config.expected_response_headers.forEach(function (header) {
        assert_equals(response.headers.get(header[0]), header[1],
          `Response ${reqNum} header ${header[0]} is "${response.headers.get(header[0])}", not "${header[1]}"`)
      })
    }
    return response.text()
  }
}

function makeCheckResponseBody (config, uuid) {
  return function checkResponseBody (resBody) {
    if ('expected_response_text' in config) {
      assert_equals(resBody, config.expected_response_text,
        `Response body is "${resBody}", not "${config.expected_response_text}"`)
    } else if ('response_body' in config) {
      assert_equals(resBody, config.response_body,
        `Response body is "${resBody}", not "${config.response_body}"`)
    } else {
      assert_equals(resBody, uuid, `Response body is "${resBody}", not "${uuid}"`)
    }
  }
}

function checkRequests (requests, testState) {
  for (let i = 0; i < requests.length; ++i) {
    var expectedValidatingHeaders = []
    var config = requests[i]
    var reqNum = i + 1
    if ('expected_type' in config) {
      if (config.expected_type === 'cached') {
        assert_true(testState.length <= i, `cached response used for request ${reqNum}`)
        continue // the server will not see the request, so we can't check anything else.
      }
      if (config.expected_type === 'not_cached') {
        assert_false(testState.length <= i, `cached response used for request ${reqNum}`)
      }
      if (config.expected_type === 'etag_validated') {
        expectedValidatingHeaders.push('if-none-match')
      }
      if (config.expected_type === 'lm_validated') {
        expectedValidatingHeaders.push('if-modified-since')
      }
    }
    for (let j in expectedValidatingHeaders) {
      var vhdr = expectedValidatingHeaders[j]
      assert_own_property(testState[i].request_headers, vhdr, `has ${vhdr} request header`)
    }
    if ('expected_request_headers' in requests[i]) {
      var expectedRequestHeaders = requests[i].expected_request_headers
      for (let j = 0; j < expectedRequestHeaders.length; ++j) {
        var expectedHdr = expectedRequestHeaders[j]
        assert_equals(testState[i].request_headers[expectedHdr[0].toLowerCase()], expectedHdr[1],
          `request ${reqNum} header ${expectedHdr[0]} value is "${testState[i].request_headers[expectedHdr[0].toLowerCase()]}", not "${expectedHdr[1]}"`)
      }
    }
  }
}

function pause () {
  return new Promise(function (resolve, reject) {
    step_timeout(function () {
      return resolve()
    }, 3000)
  })
}

function makeTestUrl (uuid, config) {
  var arg = ''
  if ('query_arg' in config) {
    arg = `&target=${config.query_arg}`
  }
  return `resources/http-cache.py?dispatch=test&uuid=${uuid}${arg}`
}

function getServerState (uuid) {
  return fetch(`resources/http-cache.py?dispatch=state&uuid=${uuid}`)
    .then(function (response) {
      return response.text()
    }).then(function (text) {
      // null will be returned if the server never received any requests
      // for the given uuid.  Normalize that to an empty list consistent
      // with our representation.
      return JSON.parse(text) || []
    })
}

function run_tests (tests) {
  tests.forEach(function (test) {
    promise_test(makeTest(test), test.name)
  })
}

function http_date (delta) {
  return new Date(Date.now() + (delta * 1000)).toGMTString()
}

var contentStore = {}
function http_content (csKey) {
  if (csKey in contentStore) {
    return contentStore[csKey]
  } else {
    var content = btoa(Math.random() * Date.now())
    contentStore[csKey] = content
    return content
  }
}
