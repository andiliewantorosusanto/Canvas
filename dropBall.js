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
        c.shadowBlur = 10;
        c.shadowColor = "white";
        c.fillStyle = "white";
        c.fill();
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;

        //this.xVel *= this.gVel;
        this.yVel += this.gVel;
    }

    isCollide() {
        return this.y+this.r >= innerHeight;
    }

    bounceBack() {
        this.y = innerHeight-this.r;
        this.yVel = -this.yVel*this.bounceVelMult;
        this.r = this.r*0.5;
    }

    isTooSmall() {
        return this.r < 5;
    }
}

var balls = [];

setInterval(addBall,125);
function addBall()
{
    balls.push(new Ball(Math.random()*innerWidth,0,25,-3 + Math.random()*6,1));
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0,innerWidth,innerHeight);
    for(var i = 0 ; i < balls.length ; i++)
    {
        var ball = balls[i];
        ball.draw();
        ball.update();
        if(ball.isCollide()) 
        {
            if(ball.isTooSmall())
            {
                balls.splice(balls.indexOf(ball),1);
            } 
            else
            {
                ball.bounceBack();

                for(var i = 0 ; i < 3 ; i++)
                {
                    balls.push(new Ball(ball.x,ball.y,ball.r*0.5,ball.xVel*(Math.random()*4-2),ball.yVel*Math.random()));
                }
            }
        }
    }
}

animate();
