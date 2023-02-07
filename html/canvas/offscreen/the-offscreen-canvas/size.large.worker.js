// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:size.large
// Description:
// Note:<p class="notes">Not sure how reasonable this is, but the spec doesn't say there's an upper limit on the size.

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

var n = 2147483647; // 2^31 - 1, which should be supported by any sensible definition of "long"
canvas.width = n;
canvas.height = n;
_assertSame(canvas.width, n, "canvas.width", "n");
_assertSame(canvas.height, n, "canvas.height", "n");
t.done();

});
done();
