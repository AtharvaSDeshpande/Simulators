namespace geometry {
    export class point {
        public x: number;
        public y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
    

    export class simulator {
       
        private context: CanvasRenderingContext2D;
        
        private p1:point = new point (200,250);
        private width: number = 100;
        private height: number = 150;
       
        private Slider1: HTMLInputElement;
        notgateendpoint: point;
        circuitcolor:string;
        constructor(context: CanvasRenderingContext2D, Slider1: HTMLInputElement) {
            
            this.Slider1 = Slider1;
            
            this.context = context;
           
            this.drawrect(200, 250, 100, 150, "#9766A1", Slider1);
           
            this.drawblocks(new point(this.p1.x, this.p1.y), this.width, this.height, 35);
            
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
        private drawresistor(start:point )
        {
            this.context.beginPath();
            this.context.moveTo(start.x,start.y)
            for (var i=0;i<3;i++)
            {
                
                this.context.lineTo(start.x+6,start.y+4)
                this.context.lineTo(start.x-6,start.y+8)

                start.y += 8;
            }
            this.context.lineTo(start.x,start.y+4)

            this.context.stroke();
        
        }
        private drawtriangle(start:point)
        {
           
           
            this.context.beginPath();
            this.context.moveTo(start.x,start.y)
            this.context.lineTo(start.x+40,start.y)
            this.context.lineTo(this.notgateendpoint.x,this.notgateendpoint.y);
            this.context.lineTo(start.x,start.y);
            this.context.fillStyle=this.circuitcolor;
            this.context.fill();
            this.context.stroke();
        }
        private drawelectroniccircuit()
        {
            var start:point = new point(this.notgateendpoint.x,this.notgateendpoint.y-105);
            this.context.beginPath()
            this.context.strokeStyle="black";
            this.context.lineWidth=1.5;
           
            this.context.arc(start.x,start.y,5,0,2*Math.PI);
            this.context.moveTo(start.x,start.y+5);
            this.context.lineTo(start.x,start.y+25)
            this.context.stroke();
            this.drawresistor(new point(start.x,start.y+25));
            start.y = start.y+25+28;
            this.context.moveTo(start.x,start.y)
            this.context.lineTo(start.x,start.y+10)
            this.context.stroke();
            this.drawtriangle(new point(start.x-20,start.y+10));
            this.context.moveTo(this.notgateendpoint.x-20,this.notgateendpoint.y);
            this.context.lineTo(this.notgateendpoint.x+20,this.notgateendpoint.y);
            this.context.stroke();
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
            this.context.beginPath();
            this.context.strokeStyle = color1;
            this.context.moveTo(this.p1.x + this.width + 5, this.p1.y + this.height - 30 - 7);
            this.context.lineTo(this.p1.x + this.width + 35, this.p1.y + this.height - 30 - 7);
            this.context.lineTo(this.p1.x + this.width + 35, this.p1.y + this.height - 150);
            this.context.lineTo(this.p1.x + this.width + 125, this.p1.y + this.height - 150);
            this.context.stroke();
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
            this.context.lineTo(x + 62 + 120, y + 155);
            this.context.lineTo(x + 62 + 120, y + 145);
    
            this.context.stroke();
            this.notgateendpoint = new point(x + 62 + 120, y + 145)
            if (color2=="grey")
                this.circuitcolor = "red";
            else
                this.circuitcolor = "grey";
        }

       
        private drawrect(x: number, y: number, width: number, height: number, color: string, Slider: any) {


            this.drawblocks(new point(this.p1.x, this.p1.y), width, height, 35);
           

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
        private updateslider(Slider1: HTMLInputElement) {
            this.Slider1 = <HTMLInputElement>document.getElementById("Slider_1");
           
        }
        animate() {


            this.context.clearRect(0, 0, 800, 800);
            this.updateslider(Slider1);

            this.drawrect(200, 250, 100, 150, "#9766A1", Slider1);
            this.drawnotgate(400, 250,"gray");
            
            var temp1: number = parseFloat(Slider1.value);
            
            if (temp1 > 35) {
                this.drawnotgate(400, 250, "green");
            }
            else {
                this.drawnotgate(400, 250, "grey");
            }
            this.drawelectroniccircuit();
            if (temp1 > 35 ) {
                    // this.context.beginPath();
                    // this.context.strokeStyle = "green";
                    // this.context.moveTo(this.centre.x, this.centre.y);
                    // this.context.lineTo(this.centre.x + 30, this.centre.y);
                    // this.context.stroke();
            }



        }
    }
}