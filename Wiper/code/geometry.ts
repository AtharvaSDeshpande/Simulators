namespace Geometry {
    export class point {
        public x: number;
        public y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
    export class line {
        public p1: point;
        public p2: point;
        public angle: number;
        public max_angle: number;
        public min_angle:number;
        public ismax:boolean;
        public length: number;
        public context: CanvasRenderingContext2D;
        constructor(p1: point, p2: point, context: CanvasRenderingContext2D) {
            this.p1 = p1;
            this.p2 = p2;
            this.angle = 20;
            this.max_angle=20;
            this.min_angle=-20;
            this.ismax=true;
            this.context = context;
        }
        draw() {
           
            this.context.beginPath();
            this.context.moveTo(this.p1.x, this.p1.y);
            this.context.lineTo(this.p2.x, this.p2.y);
            this.context.lineWidth = 3;
            this.context.fillStyle="yellow";
            this.context.fill();
            this.context.stroke();
        }
        updateangle() {
            
            if (this.ismax)
            {
                
                
                if (this.angle==this.max_angle)
                    this.ismax=false;
                this.angle++;
            }
            else
            {
               
                
                if (this.angle==this.min_angle)
                    this.ismax=true;
                this.angle--;
            }
            this.getlength();
            this.p2.x = this.p1.x + this.length * Math.cos(this.angle * Math.PI / 180);
            this.p2.y = this.p1.y + this.length * Math.sin(this.angle * Math.PI / 180);
        }
        getlength() {
            this.length = Math.pow(this.p2.x - this.p1.x, 2) + Math.pow(this.p2.y - this.p1.y, 2);
            this.length = Math.sqrt(this.length);

        }
    }
    export class circle {
        public centre: point;
        public arbtpt: point;
        public r:number;
        public angle:number;
        public length:number;
        public context:any;
        public color: any;
        constructor (centre:point , arbtpt:point , r:number , context: CanvasRenderingContext2D)
        {
            this.centre=centre;
           
            this.arbtpt=arbtpt;
            this.r=r;
            this.getangle();
            this.context = context;
            this.color = "black";
            this.getlength();
        }
        getangle ()
        {
            this.angle=Math.atan((this.centre.y-this.arbtpt.y)/(this.centre.x-this.arbtpt.x));
            this.angle=this.angle*180/Math.PI;
            
        }
        draw() {
            
            this.context.beginPath();
            this.context.arc(this.centre.x, this.centre.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth=3;
            this.context.color="yellow";
            this.context.fillStyle="yellow";
            this.context.fill();
            this.context.stroke();
    
        }
        updateangle ()
        {
          
            this.angle=this.angle+3;
            this.centre.x = this.arbtpt.x + this.length*Math.cos(this.angle*Math.PI/180);
            this.centre.y = this.arbtpt.y + this.length*Math.sin(this.angle*Math.PI/180);
            
        }
        getlength() 
        {
            this.length = Math.pow((this.arbtpt.x-this.centre.x),2)+Math.pow((this.arbtpt.y-this.centre.y),2);
            this.length = Math.sqrt(this.length);
        }
    
    }
}
