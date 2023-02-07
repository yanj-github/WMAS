// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.basic
// Description:putImageData() puts image data from getImageData() onto the canvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("putImageData() puts image data from getImageData() onto the canvas");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50)
var imgdata = ctx.getImageData(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50)
ctx.putImageData(imgdata, 0, 0);
_assertPixelApprox(canvas, 50,25, 0,255,0,255, 2);
t.done();

});
done();
