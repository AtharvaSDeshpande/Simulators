var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var Slider1 = document.getElementById("Slider_1");
Slider1.value = "35";
var hasinitialized = false;
var S;
function start() {
    if (!hasinitialized) {
        var div = document.getElementById("div");
        div.style.display = "";
        hasinitialized = true;
        S = new geometry.simulator(context, Slider1);
        animate();
    }
}
function animate() {
    S.animate();
    window.requestAnimationFrame(animate);
}
//# sourceMappingURL=app.js.map