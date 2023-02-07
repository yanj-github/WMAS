// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.transformation.multiple
// Description:Transformations are applied while building paths, not when drawing
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Transformations are applied while building paths, not when drawing");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#f00';
ctx.translate(-100, 0);
ctx.rect(0, 0, 100, 50);
ctx.fill();
ctx.translate(100, 0);
ctx.fill();
ctx.beginPath();
ctx.strokeStyle = '#f00';
ctx.lineWidth = 50;
ctx.translate(0, -50);
ctx.moveTo(0, 25);
ctx.lineTo(100, 25);
ctx.stroke();
ctx.translate(0, 50);
ctx.stroke();
_assertPixel(canvas, 50,25, 0,255,0,255);
t.done();

});
done();
