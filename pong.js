var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

class Ball {
    constructor(x,y,r,xVel,yVel){
        this.x = x;
        this.y = y;
        this.r = r;

        this.xVel = xVel;
        this.yVel = yVel;
    }

    draw() {
        c.beginPath();
        
        c.arc(this.x,this.y,this.r,0,2*Math.PI);
        c.fillStyle = "white";
        c.fill();
        c.shadowBlur = 10;
        c.shadowColor = "white";
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
    }

    isCollide() {
        return this.y+this.r >= innerHeight || this.x-this.r <= 0 || this.x+this.r >= innerWidth || this.y-this.r <= 0;
    }

    bounceBack() {
        if(this.y+this.r >=innerHeight)
        {
            this.y = innerHeight-this.r;
            this.yVel = -this.yVel;
        }
        else if(this.x-this.r <= 0)
        {
            this.x = this.r;
            this.xVel = -this.xVel;
        }
        else if(this.x+this.r >= innerWidth)
        {
            this.x = innerWidth-this.r;
            this.xVel = -this.xVel;
        }
        else if(this.y-this.r <= 0)
        {
            this.y = this.r;
            this.yVel = -this.yVel;
        }
    }
}

var ball = new Ball(Math.random()*innerWidth,-100,25,5,5);

function animate() {
    
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0,innerWidth,innerHeight);

    ball.draw();
    ball.update();
    if(ball.isCollide()) { ball.bounceBack(); }
}

animate();
