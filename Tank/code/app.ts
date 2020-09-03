var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mycanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");
let C: geometry.circle;
var Slider1 =  <HTMLInputElement> document.getElementById("Slider_1");
var Slider2 =  <HTMLInputElement> document.getElementById("Slider_2");
Slider1.value = "35";
Slider2.value = "50";

var hasinitialized:boolean = false;

var S:geometry.simulator
function start()
{
    
    if (!hasinitialized)
    {   
        var div:HTMLDivElement =  <HTMLDivElement> document.getElementById("div")
        div.style.display = "";
        hasinitialized = true;
        S = new geometry.simulator(context,Slider1,Slider2);
        animate();
    }
}
function animate()
{
    S.animate();
    window.requestAnimationFrame(animate);
}



