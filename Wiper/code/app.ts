var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mycanvas");
var context: CanvasRenderingContext2D = canvas.getContext("2d");
let l1: Geometry.line;
let l2: Geometry.line;
let C: Geometry.circle;
let Wiper: Geometry.circle;
let Ignit: Geometry.circle;
var isinitialized: boolean = false;
var hasstarted: boolean = false;
var color1:string="grey";
var color2:string="grey";
var andcolor:string="black";
drawall();
function start() {
    if (!isinitialized) {
        isinitialized = true;
        let p1 = new Geometry.point(400, 300);
        let p2 = new Geometry.point(500, 300);
        l1 = new Geometry.line(p1, p2, context);
        let p3 = new Geometry.point(400, 350);
        let p4 = new Geometry.point(500, 350);
        l2 = new Geometry.line(p3, p4, context);
        let c1 = new Geometry.point(320 + 15, 325);
        let a1 = new Geometry.point(320, 325);
        C = new Geometry.circle(c1, a1, 2, context);
    }
    
    drawall();
    //animate();
}

function drawall()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawcircle(320 , 325 , 20, 0 , 2 * Math.PI, "grey");
    drawcircle(50 , 300 , 20,  0 , 2 * Math.PI ,color1);
    drawcircle(50 , 350 , 20 , 0 , 2 * Math.PI ,color2);
    context.beginPath()
    context.moveTo(400, 250);
    context.lineTo(400, 400);
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.stroke();
    context.lineWidth = 1;
    drawandgate(andcolor);
    hasstarted = false;
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawcircle(320 , 325 , 20, 0 , 2 * Math.PI, "grey");
    drawcircle(50 , 300 , 20,  0 , 2 * Math.PI ,color1);
    drawcircle(50 , 350 , 20 , 0 , 2 * Math.PI ,color2);
    context.beginPath()
    context.moveTo(400, 250);
    context.lineTo(400, 400);
    context.strokeStyle = "blue";
    context.lineWidth = 10;
    context.stroke();
    context.strokeStyle = "red";
    l1.updateangle();
    l2.updateangle();
    l1.draw();
    l2.draw();
    context.strokeStyle = "yellow";
    C.draw();
    C.updateangle();
    drawandgate(andcolor);
    if (hasstarted)
        window.requestAnimationFrame(animate);
}
function Stop() 
{
    hasstarted = false;
}
function drawcircle(x:number,y:number,r:number,sa:number,ea:number,color :string)
{
    context.beginPath()
    context.strokeStyle = "black";
    context.fillStyle = color;
    context.arc(x,y,r,sa,ea);
    context.fill();
   // context.stroke();
}
function mouseevt(x,y)
{
    var r1:number;
    var r2:number;
    r1 = Math.sqrt(Math.pow((x-50),2)+Math.pow((y-300),2));
    r2 = Math.sqrt(Math.pow((x-50),2)+Math.pow((y-350),2));
    if (r1<20){
        if (color1=="grey")
            color1 = "green";
        else
            color1="grey";
        drawall();
    }
    if (r2<20){
        if (color2=="grey")
            color2 = "green";
        else
            color2="grey";
        drawall();
    }
    if (color1=="green" && color2 == "green")
    {
        if (!hasstarted)
        {
        hasstarted=true;
        andcolor="green";
        animate(); 
        }
    }
    else 
    {
        andcolor="black";
        hasstarted=false;
    }

}
function drawandgate(color:string)
{
    context.beginPath();
    context.strokeStyle=color;
    context.moveTo(70,300);
    context.lineTo(150,300);
    context.moveTo(70,350);
    context.lineTo(150,350);
    context.moveTo(180+35,325);
    context.lineTo(300,325);
    context.stroke();
    context.beginPath();
    context.strokeStyle="black";
    context.moveTo(150,290);
    context.lineTo(150,360);
    context.moveTo(150,290);
    context.lineTo(180,290);
    context.moveTo(150,360);
    context.lineTo(180,360);
    context.moveTo(180,290);
    context.arc(180,325,35,-Math.PI/2,Math.PI/2);
    context.stroke();
}