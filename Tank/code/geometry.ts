namespace geometry {
    export class point {
        public x: number;
        public y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
    export class circle {
        public centre: point;
        public arbtpt: point;
        public r: number;
        public angle: number;
        public length: number;
        public context: any;
        public color: any;
        this: any;
        constructor(centre: point, arbtpt: point, r: number, context: CanvasRenderingContext2D) {
            this.centre = centre;

            this.arbtpt = arbtpt;
            this.r = r;
            this.getangle();

            this.context = context;
            this.color = "black";
            this.getlength();
        }
        getangle() {
            this.angle = Math.atan((this.centre.y - this.arbtpt.y) / (this.centre.x - this.arbtpt.x));
            this.angle = this.angle * 180 / Math.PI;

        }
        draw() {

            this.context.beginPath();
            this.context.arc(this.centre.x, this.centre.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth = 3;
            this.context.color = "yellow";
            this.context.fillStyle = "yellow";
            this.context.fill();
            this.context.stroke();

        }
        updateangle(x: number) {
            
            this.angle = this.angle + x * 3;
            
            this.centre.x = this.arbtpt.x + this.length * Math.cos(this.angle * Math.PI / 180);
            this.centre.y = this.arbtpt.y + this.length * Math.sin(this.angle * Math.PI / 180);
            
        }
        getlength() {
            this.length = Math.pow((this.arbtpt.x - this.centre.x), 2) + Math.pow((this.arbtpt.y - this.centre.y), 2);
            this.length = Math.sqrt(this.length);
        }

    }

    export class simulator {
        public C: circle;
        private context: CanvasRenderingContext2D;
        private and: point = new point(0,0);
        private centre: point = new point(0,0);
        private circleinitialize: boolean = false;
        private p1:point = new point (200,250);
        private width: number = 100;
        private height: number = 150;

        private p2:point = new point(200,50);
        private Slider1: HTMLInputElement
        private Slider2: HTMLInputElement
        constructor(context: CanvasRenderingContext2D, Slider1: HTMLInputElement, Slider2: HTMLInputElement) {
            this.C = new circle(new point(0, 0), new point(0, 0), 0, this.context);
            this.Slider1 = Slider1;
            this.Slider2 = Slider2;
            this.context = context;
            this.and = new point(0,0);
            this.centre = new point(0,0);
            this.drawrect(200, 250, 100, 150, "#9766A1", Slider1);
            this.drawrect(200, 50, 100, 150, "aqua", Slider2)
            this.drawblocks(new point(this.p1.x, this.p1.y), this.width, this.height, 35);
            this.drawblocks(new point(this.p2.x, this.p2.y), this.width, this.height, 130);
        }


        private drawblocks(pt: point, width: number, height: number, h1: number) {
            var p: number = pt.y + height - h1;
            p = p - 5;
            this.context.beginPath();
            this.context.lineWidth = 3;
            this.context.strokeStyle = "black"
            this.context.rect(pt.x + width, p, 5, 5);
            this.context.stroke();
        }
        private drawallgates(color: string = "grey") {
            
            this.drawnotgate(this.p2.x + this.width + 5, this.p2.y + this.height - 128 - 5, color);
            this.drawandgate(this.and.x, this.and.y);
            

        }
        private drawnotgate(x: number, y: number, color: string) {
            var color1: string;
            var color2: string;
            if (color == "grey") {
                color2 = "grey";
                color1 = "green";
            }
            else {
                color1 = "grey";
                color2 = "green";
            }
            this.context.save();
            this.context.beginPath();
            this.context.moveTo(x, y);
            this.context.lineTo(x + 30, y);
            this.context.strokeStyle = color1;
            this.context.stroke();
            this.context.beginPath();
            this.context.strokeStyle = "Black";
            this.context.moveTo(x + 30, y);
            this.context.lineTo(x + 30, y - 30);
            this.context.lineTo(x + 60, y);
            this.context.lineTo(x + 30, y + 30);
            this.context.lineTo(x + 30, y);
            this.context.stroke();

            this.context.beginPath();

            this.context.arc(x + 60 + 2, y, 3, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.restore();

            this.context.beginPath();
            this.context.strokeStyle = color2;
            this.context.moveTo(x + 62, y);
            this.context.lineTo(x + 62 + 30, y);
            this.context.lineTo(x + 62 + 30, y + 155);
            this.context.lineTo(x + 62 + 60, y + 155);
            this.and.x = x + 62 + 60;
            this.and.y = y + 140;
            this.context.stroke();
        }

        private drawandgate(x: number, y: number, color: string = "grey") {
            this.context.beginPath();
            this.context.strokeStyle = "black";
            this.context.moveTo(x, y);
            this.context.lineTo(x, y + 50);
            this.context.lineTo(x + 50, y + 50);
            this.context.moveTo(x, y);
            this.context.lineTo(x + 50, y);
            this.context.stroke();
            this.context.beginPath();
            // this.context.strokeStyle = "black";

            this.context.arc(x + 50, y + 25, 25, -Math.PI / 2, Math.PI / 2);

            this.centre.x = x + 75;
            this.centre.y = y + 25;
            this.context.stroke();
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.moveTo(this.p1.x + this.width + 5, this.p1.y + this.height - 30 - 7);
            this.context.lineTo(this.p1.x + this.width + 35, this.p1.y + this.height - 30 - 7);
            this.context.lineTo(this.p1.x + this.width + 35, this.p1.y + this.height - 150);
            this.context.lineTo(this.p1.x + this.width + 125, this.p1.y + this.height - 150);
            this.context.stroke();
            this.context.beginPath();
            this.context.strokeStyle = "grey";
            this.context.moveTo(this.centre.x, this.centre.y);

            this.context.lineTo(this.centre.x + 30, this.centre.y);
            if (!this.circleinitialize) {
                let a1 = new geometry.point(this.centre.x + 30 + 20, this.centre.y);
                let c1 = new geometry.point(this.centre.x + 30 + 36, this.centre.y);
                this.C = new circle(c1, a1, 2, this.context);
                this.circleinitialize = true;
                
            }
            this.context.stroke();
            this.context.beginPath()
            this.context.fillStyle = color;
            this.context.arc(this.centre.x + 30 + 20, this.centre.y, 20, 0, 2 * Math.PI);
            this.context.fill();
            

        }
        private drawrect(x: number, y: number, width: number, height: number, color: string, Slider: any) {


            this.drawblocks(new point(this.p1.x, this.p1.y), width, height, 35);
            this.drawblocks(new point(this.p2.x, this.p2.y), width, height, 130);

            this.context.beginPath();
            this.context.strokeStyle = "black";
            this.context.lineWidth = 3;
            this.context.rect(x, y, width, height);
            this.context.stroke();
            var p = parseFloat(Slider.value);
            this.context.rect(x, y, width, 20);
            this.context.fillStyle = color;
            this.context.fillRect(x, height + y, width, -p);
            this.context.beginPath();
            this.context.strokeStyle = "black";
            this.context.lineWidth = 3;
            this.context.rect(x, y, width, height);
            this.context.stroke();

        }
        private updateslider(Slider1: HTMLInputElement, Slider2: HTMLInputElement) {
            this.Slider1 = <HTMLInputElement>document.getElementById("Slider_1");
            this.Slider2 = <HTMLInputElement>document.getElementById("Slider_2");
        }
        animate() {


            this.context.clearRect(0, 0, 800, 800);
            this.updateslider(Slider1, Slider2);

            this.drawrect(200, 250, 100, 150, "#9766A1", Slider1);
            this.drawallgates();
            this.drawrect(200, 50, 100, 150, "aqua", Slider2);
            var temp: number = parseFloat(Slider2.value);
            if (temp < 130) {
                this.drawnotgate(this.p2.x + this.width + 5, this.p2.y + this.height - 128 - 5, "green");
            }
            else {
                this.drawnotgate(this.p2.x + this.width + 5, this.p2.y + this.height - 128 - 5, "grey");
            }
            var temp1: number = parseFloat(Slider1.value);
            if (temp1 > 35) {
                this.drawandgate(this.and.x, this.and.y, "green");
            }
            else {
                this.drawandgate(this.and.x, this.and.y, "grey");
            }

            if (temp1 > 35 && temp < 130) {


                if (temp <= 131) {
                    this.context.beginPath();
                    this.context.strokeStyle = "green";
                    this.context.moveTo(this.centre.x, this.centre.y);

                    this.context.lineTo(this.centre.x + 30, this.centre.y);
                    this.context.stroke();

                    temp = temp + temp1 / 50;

                    this.C.updateangle(temp1 / 50);
                    this.context.strokeStyle = "yellow";
                    this.C.draw();
                }
                Slider2.value = "" + temp;
            }



        }
    }
}