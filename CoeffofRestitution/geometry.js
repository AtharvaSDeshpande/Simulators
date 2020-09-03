var geometry;
(function (geometry) {
    class point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    geometry.point = point;
    class circle {
        constructor(centre, radius, height, e, context) {
            this.centre = centre;
            this.radius = radius;
            this.context = context;
            this.g = 9.8;
            this.s1 = height;
            this.e = e;
            this.s2 = this.e * this.e * this.s1;
            this.addfactor = 0;
        }
        update() {
            //This function uses laws of motion to get u1,v1,u2,v2,t1,t2
            this.u1 = Math.sqrt(2 * this.g * this.s1);
            this.v1 = Math.sqrt(this.u1 * this.u1 + 2 * this.g * this.s1);
            this.u2 = this.v1;
            this.v2 = Math.sqrt(this.u2 * this.u2 - 2 * this.g * this.s2);
            this.t1 = (this.v1 - this.u1) / this.g;
            this.t2 = (this.v2 - this.u2) / (-this.g);
        }
        postupdate() {
            //This function is used to update s1 and s2 
            this.s1 = this.s2; //new s1 will be equal to current s2
            this.s2 = this.e * this.e * this.s1; //new s2 = e*e + s1
        }
        draw() {
            this.context.beginPath();
            this.context.lineWidth = 3;
            this.context.strokeStyle = "red";
            this.context.fillStyle = "red";
            this.context.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fill();
            context.stroke();
        }
    }
    geometry.circle = circle;
    class Draw {
        constructor(context, e) {
            this.context = context;
            this.centre = new point(100, 30);
            this.radius = 20;
            this.y_cord = this.centre.y;
            this.height = 495 - this.radius - this.centre.y;
            /*     As the ground is at y =  500px and ground is 10px thick therefore its  height upward will
                   be (10px/2) and thus we get the constant 495,
                   Also, we need to subtract other elements such as y cordinate of starting point of the circle
                   and radius of circle
                   After calculation we will get the accurate height between ball and the ground
           */
            this.c1 = new circle(this.centre, 20, this.height, e, this.context);
            this.motionisdown = true; //BOolean variable which tells ball is moving downwards
            this.t = 0;
            this.c1.update(); //Initialize motion values of c1
        }
        drawbase() {
            this.context.beginPath();
            this.context.moveTo(0, 500);
            this.context.lineTo(600, 500);
            this.context.lineWidth = 10;
            this.context.strokeStyle = "green";
            this.context.stroke();
        }
        draw() {
            this.drawbase();
            this.c1.draw();
        }
        update() {
            if (this.motionisdown) {
                this.c1.centre.y = (this.c1.addfactor + (this.c1.u1 * (this.t) + 0.5 * 9.8 * this.t * this.t)) + this.y_cord;
                /*
                    The above code uses Newtons laws motion to calculate displacement the addfactor and y cordinate
                    of starting point of circle will convert that displacement to its respective point on canvas
                */
                this.t += 0.05; //time is increased , this will also govern the speed in which ball will move
                if (this.t > this.c1.t1) { //If t has reached/crossed its max value,motion has to be reversed 
                    this.motionisdown = false;
                    this.t = 0; //Reset t
                }
            }
            if (!this.motionisdown) {
                this.c1.centre.y = this.height - (this.c1.u2 * this.t - 0.5 * 9.8 * this.t * this.t) + this.y_cord;
                /*
                    The above code uses Newtons laws motion to calculate displacement the height and y coordinate
                    of starting point of circle will convert that displacement to its respective point on canvas
                */
                this.t += 0.05; //time is increased , this will also govern the speed in which ball will move
                if (this.t > this.c1.t2) { //If t has reached/crossed its max value,motion has to be reversed 
                    this.motionisdown = true;
                    this.t = 0;
                    this.c1.addfactor = this.height - this.c1.s2; //Addfactor changes to furthe change height
                    this.c1.postupdate();
                    this.c1.update();
                }
            }
        }
    }
    geometry.Draw = Draw;
})(geometry || (geometry = {}));
//# sourceMappingURL=geometry.js.map