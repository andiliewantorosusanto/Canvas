var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');



function Line(x1,y1,x2,y2)
{
    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;
}

function Point(x,y)
{
    this.x =x;
    this.y =y;

    
}

var lines = [];


function animate() {
    requestAnimationFrame(animate);

    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;

    for(var x = 0 ; x < innerWidth ; x++)
    {
        for(var y = 0 ; y < innerHeight ; y++)
        {
            c.beginPath();
            c.fillStyle = "rgb("+r/innerWidth*x+","+g/innerWidth*x+","+b/innerWidth*x+")";
            c.fillRect(x,y,1,1);
        }
    }
}

animate();
