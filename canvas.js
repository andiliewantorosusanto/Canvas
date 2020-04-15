var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Line(x1,y1,x2,y2,strokeStyle)
{
    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;
    
    this.r = r;
    this.g = g;
    this.b = b;

    this.draw = function() {
        c.beginPath();
        c.moveTo(x1,y1);
        c.lineTo(x2,y2);
        c.strokeStyle = this.strokeStyle;
        c.stroke();
    }

    this.update = function() {

    }
}

var lines = [];

for(var i = 1; i <= innerWidth ; i++)
{
    lines.push(new Line(i,0,i,innerHeight,"rgba(125,125,"+(255/innerWidth*i)+",0.5)"));
}

function animate() {
    requestAnimationFrame(animate);
    lines.forEach(line => {
        line.draw();
    });
}

animate();
