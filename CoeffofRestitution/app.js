var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var ismoving = false;
var simulator;
function start() {
    var input_id = document.getElementById("t1");
    var e = parseFloat(input_id.value);
    if (!isNaN(e) && e > 0 && e < 1 && !ismoving) //If e is not invalid and e lies in range 0 < e < 1 and animation is inactive
     {
        simulator = new geometry.Draw(context, e); //Create object of class Draw
        simulator.draw(); //Draw clircle and ground
        ismoving = true; //Set ismoving to true to start animation frame
        animator();
    }
    else if (!ismoving) { //If animation is inactive and user enters invalid data
        alert("Please enter valid coefficient of restitution which lies in range  0 < e < 1 ");
    }
}
function stop() {
    ismoving = false; //To stop animation by user
}
function animator() {
    simulator.context.clearRect(0, 0, canvas.width, canvas.height);
    simulator.draw(); //Draw clircle and ground
    simulator.update(); //Update
    if (ismoving) //If animation has started and not stoped by user
     {
        if (simulator.c1.v2 >= 0.000001) {
            window.requestAnimationFrame(animator);
        }
        else {
            alert("THE BALL HAS STOPPED");
            ismoving = false; //The ball is no more moving
        }
    }
}
//# sourceMappingURL=app.js.map