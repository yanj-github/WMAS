// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.arc.shape.2
// Description:arc() from 0 to pi draws stuff in the right half
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("arc() from 0 to pi draws stuff in the right half");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.lineWidth = 100;
ctx.strokeStyle = '#0f0';
ctx.beginPath();
ctx.arc(50, 50, 50, 0, Math.PI, true);
ctx.stroke();
_assertPixel(canvas, 50,25, 0,255,0,255);
_assertPixel(canvas, 1,1, 0,255,0,255);
_assertPixel(canvas, 98,1, 0,255,0,255);
_assertPixel(canvas, 1,48, 0,255,0,255);
_assertPixel(canvas, 20,48, 0,255,0,255);
_assertPixel(canvas, 98,48, 0,255,0,255);
t.done();

});
done();
