// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.filter.canvasFilterObject.colorMatrix
// Description:Test the functionality of ColorMatrix filters in CanvasFilter objects
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Test the functionality of ColorMatrix filters in CanvasFilter objects");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: undefined}}); });
assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: "foo"}}); });
assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: null}}); });
assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: [1, 2, 3]}}); });
assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, "a"]}}); });
assert_throws_js(TypeError, function() { new CanvasFilter({colorMatrix: {values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, Infinity]}}); });
ctx.fillStyle = "#f00";
ctx.filter = new CanvasFilter({colorMatrix: {type: "hueRotate", values: 0}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 255,0,0,255, "10,10", "255,0,0,255", 2);
ctx.filter = new CanvasFilter({colorMatrix: {type: "hueRotate", values: 90}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 0,91,0,255, "10,10", "0,91,0,255", 2);
ctx.filter = new CanvasFilter({colorMatrix: {type: "hueRotate", values: 180}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 0,109,109,255, "10,10", "0,109,109,255", 2);
ctx.filter = new CanvasFilter({colorMatrix: {type: "hueRotate", values: 270}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 109,18,255,255, "10,10", "109,18,255,255", 2);
ctx.filter = new CanvasFilter({colorMatrix: {type: "saturate", values: 0.5}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 155,27,27,255, "10,10", "155,27,27,255", 2);
ctx.clearRect(0, 0, 100, 50);
ctx.filter = new CanvasFilter({colorMatrix: {type: "luminanceToAlpha"}});
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 10,10, 0,0,0,54, "10,10", "0,0,0,54", 2);
ctx.filter = new CanvasFilter({colorMatrix: {values: [
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0
]}});
ctx.fillRect(0, 0, 50, 25);
ctx.fillStyle = "#0f0";
ctx.fillRect(50, 0, 50, 25);
ctx.fillStyle = "#00f";
ctx.fillRect(0, 25, 50, 25);
ctx.fillStyle = "#fff";
ctx.fillRect(50, 25, 50, 25);
_assertPixelApprox(offscreenCanvas, 10,10, 0,255,0,255, "10,10", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 60,10, 0,255,0,255, "60,10", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 10,30, 0,255,0,255, "10,30", "0,255,0,255", 2);
_assertPixelApprox(offscreenCanvas, 60,30, 0,255,0,255, "60,30", "0,255,0,255", 2);
t.done();

});
done();
