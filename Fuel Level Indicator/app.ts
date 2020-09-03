var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mycanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");

var Slider1 =  <HTMLInputElement> document.getElementById("Slider_1");

Slider1.value = "35";


var hasinitialized:boolean = false;

var S:geometry.simulator
function start()
{
    
    if (!hasinitialized)
    {   
        var div:HTMLDivElement =  <HTMLDivElement> document.getElementById("div")
        div.style.display = "";
        hasinitialized = true;
        S = new geometry.simulator(context,Slider1);
        animate();
    }
}
function animate()
{
    S.animate();
    window.requestAnimationFrame(animate);
}



