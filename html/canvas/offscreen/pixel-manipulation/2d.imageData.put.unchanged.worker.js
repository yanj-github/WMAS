// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.put.unchanged
// Description:putImageData(getImageData(...), ...) has no effect
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("putImageData(getImageData(...), ...) has no effect");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

var i = 0;
for (var y = 0; y < 16; ++y) {
    for (var x = 0; x < 16; ++x, ++i) {
        ctx.fillStyle = 'rgba(' + i + ',' + (Math.floor(i*1.5) % 256) + ',' + (Math.floor(i*23.3) % 256) + ',' + (i/256) + ')';
        ctx.fillRect(x, y, 1, 1);
    }
}
var imgdata1 = ctx.getImageData(0.1, 0.2, 15.8, 15.9);
var olddata = [];
for (var i = 0; i < imgdata1.data.length; ++i)
    olddata[i] = imgdata1.data[i];
ctx.putImageData(imgdata1, 0.1, 0.2);
var imgdata2 = ctx.getImageData(0.1, 0.2, 15.8, 15.9);
for (var i = 0; i < imgdata2.data.length; ++i) {
    _assertSame(olddata[i], imgdata2.data[i], "olddata[\""+(i)+"\"]", "imgdata2.data[\""+(i)+"\"]");
}
t.done();

});
done();
