// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.drawing.style.textRendering.settings
// Description:Testing basic functionalities of textRendering in Canvas
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Testing basic functionalities of textRendering in Canvas");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

// Setting textRendering with lower cases
_assertSame(ctx.textRendering, "auto", "ctx.textRendering", "\"auto\"");

ctx.textRendering = "auto";
_assertSame(ctx.textRendering, "auto", "ctx.textRendering", "\"auto\"");

ctx.textRendering = "optimizespeed";
_assertSame(ctx.textRendering, "optimizeSpeed", "ctx.textRendering", "\"optimizeSpeed\"");

ctx.textRendering = "optimizelegibility";
_assertSame(ctx.textRendering, "optimizeLegibility", "ctx.textRendering", "\"optimizeLegibility\"");

ctx.textRendering = "geometricprecision";
_assertSame(ctx.textRendering, "geometricPrecision", "ctx.textRendering", "\"geometricPrecision\"");

// Setting textRendering with lower cases and upper cases word.
ctx.textRendering = "aUto";
_assertSame(ctx.textRendering, "auto", "ctx.textRendering", "\"auto\"");

ctx.textRendering = "OPtimizeSpeed";
_assertSame(ctx.textRendering, "optimizeSpeed", "ctx.textRendering", "\"optimizeSpeed\"");

ctx.textRendering = "OPtimizELEgibility";
_assertSame(ctx.textRendering, "optimizeLegibility", "ctx.textRendering", "\"optimizeLegibility\"");

ctx.textRendering = "GeometricPrecision";
_assertSame(ctx.textRendering, "geometricPrecision", "ctx.textRendering", "\"geometricPrecision\"");

// Setting textRendering with non-existing font variant.
ctx.textRendering = "abcd";
_assertSame(ctx.textRendering, "geometricPrecision", "ctx.textRendering", "\"geometricPrecision\"");
t.done();

});
done();
