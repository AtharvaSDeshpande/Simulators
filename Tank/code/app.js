var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
let C;
var Slider1 = document.getElementById("Slider_1");
var Slider2 = document.getElementById("Slider_2");
Slider1.value = "35";
Slider2.value = "50";
var hasinitialized = false;
var S;
function start() {
    if (!hasinitialized) {
        var div = document.getElementById("div");
        div.style.display = "";
        hasinitialized = true;
        S = new geometry.simulator(context, Slider1, Slider2);
        animate();
    }
}
function animate() {
    S.animate();
    window.requestAnimationFrame(animate);
}
//# sourceMappingURL=app.js.map