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

        this.gVel = 0.05;
        this.bounceVelMult = 0.70;
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

        //this.xVel *= this.gVel;
        this.yVel += this.gVel;
    }

    isCollide() {
        return this.y+this.r >= innerHeight || this.x-this.r <= 0 || this.x+this.r >= innerWidth;
    }

    bounceBack() {
        if(this.y+this.r >=innerHeight)
        {
            this.y = innerHeight-this.r;
            this.yVel = -this.yVel*this.bounceVelMult;
            this.r = this.r*0.5;
        }
        else if(this.x-this.r <= 0)
        {
            this.x = 0+this.r;
            this.xVel = -this.xVel*this.bounceVelMult;
            this.r = this.r*0.5;
        }
        else if(this.x+this.r >= innerWidth)
        {
            this.x = innerWidth-this.r;
            this.xVel = -this.xVel*this.bounceVelMult;
            this.r = this.r*0.5;
        }
    }

    isTooSmall() {
        return this.r < 5;
    }
}

var balls = [];
function addBall()
{
    balls.push(new Ball(Math.random()*innerWidth,-100,25,-3 + Math.random()*6,1));
}

setInterval(addBall,500);
function animate() {
    
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0,innerWidth,innerHeight);

    balls.forEach(ball => {
        ball.draw();
        ball.update();
    });
    balls = balls.filter(ball => !ball.isTooSmall());
    balls.filter(ball => ball.isCollide()).forEach(ball => {
        ball.bounceBack();
        let newBall = new Ball(ball.x,ball.y,ball.r*0.5,ball.xVel*(Math.random()*4-2),ball.yVel*Math.random());
        balls = [...balls,newBall];
    });
}

animate();
