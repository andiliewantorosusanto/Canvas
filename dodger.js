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

        this.gVel = 0.1;
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
        return (pythagoras(this.x,this.y,player.x,player.y) <= this.r+player.r)
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
        this.spawnRate = 60; // 1 sec = 60
        this.gravity = 0.1; // fall acc
        this.deltaTime = 0; // time has passed based on fps
        this.score = 0;
        this.scoreRate = 60 // every 60 add score
        this.start = true;
    }

    update() {
        this.deltaTime += 1;
        
        if(this.deltaTime % Math.floor(this.spawnRate) == 0){addBall();}
        if(this.deltaTime % this.scoreRate == 0){this.score++;}

        if(this.deltaTime % 300 == 0)
        {
            this.spawnRate *= 0.9;
            this.gravity += 0.01
        }
    }

    renderScore() {
        c.font = "30px arial";
        c.fillStyle = "white";
        c.textAlign = "left";
        c.fillText(`Score : ${this.score}`,0,30);
    }
    
    gameOver() {
        this.start = false;
        c.font = " 120px arial";
        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText(`You Lose`,innerWidth/2,innerHeight/2);
    }

    restart() {
        balls = [];
        this.score = 0;
        this.deltaTime = 0;
    }
}


var balls = [];
var player = new Player();
var game = new Game();

function pythagoras(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function addBall()
{
    ball = new Ball(Math.random()*innerWidth,-100,25,-3 + Math.random()*6,1);
    balls = [...balls,ball];
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
    
    if(game.start)
    {
        c.fillStyle = "black";
        c.fillRect(0,0,innerWidth,innerHeight);
        
        balls.forEach(ball => {
            ball.update();
            ball.draw();
            if(ball.isCollide(player))
            {
                game.gameOver();
            }
        });

        balls = balls.filter(ball => !ball.isOutsideMap());

        player.update();
        player.draw();

        game.update();
        game.renderScore();
    }
}

canvas.addEventListener('mousemove',function(evt){
    let pos = getMousePos(canvas,evt);
    player.x = pos.x;
    player.y = pos.y;
})

animate();
