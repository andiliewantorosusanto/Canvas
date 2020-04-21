var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


class Ball {
    constructor(x,y,r,xVel,yVel){
        this.x = x;
        this.y = y;
        this.r = r;
        this.touched = false
        this.xVel = xVel;
        this.yVel = yVel;

        this.gVel = 0.05;
    }

    draw() {
        c.beginPath();
        
        c.save();
        c.translate(0,0);

        c.shadowBlur = 10;
        (this.touched) ? c.shadowColor = "red" : c.shadowColor = "white";
        c.arc(this.x,this.y,this.r,0,2*Math.PI);
        (this.touched) ? c.fillStyle = "red" : c.fillStyle = "white";
        c.fill();
        
        c.restore();
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;

        this.yVel += this.gVel;
    }

    isCollide(player) {
        if(pythagoras(this.x,this.y,player.x,player.y) <= this.r+player.r)
        {
            this.touched = true;
        }
    }

    isOutsideMap() {
        return (this.y+this.r-100 >= innerHeight)
    }
}

class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = 10;
    }

    draw() {
        c.beginPath();
        c.save();
        c.translate(0,0);

        c.shadowBlur = 20;
        c.shadowColor = "red";
        c.arc(this.x,this.y,this.r,0,2*Math.PI);
        c.fillStyle = "red";
        c.fill();

        c.restore();
    }

    update() {

    }
}

class Game {
    constructor() {
        this.Spawnrate = 15; // 1 sec = 60
    }
}


var balls = [];
var player = new Player();
var game = new Game();
var deltaTime = 0;

function pythagoras(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function addBall()
{
    balls.push(new Ball(Math.random()*innerWidth,-100,25,-3 + Math.random()*6,1));
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime++;
    
    c.fillStyle = "black";
    c.fillRect(0,0,innerWidth,innerHeight);
    
    balls.forEach(ball => {
        ball.update();
        ball.draw();
        ball.isCollide(player);
        if(ball.isOutsideMap())
        {
            balls.splice(ball,1);
        }
    });

    player.update();
    player.draw();

    if(deltaTime % game.Spawnrate == 0)
    {
        addBall();
    } 
}

canvas.addEventListener('mousemove',function(evt){
    let pos = getMousePos(canvas,evt);
    player.x = pos.x;
    player.y = pos.y;
})
animate();
