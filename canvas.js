var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const MAX_COL = 10;
const MAX_ROW = 10;

let COLOR_R_MIN = 0;
let COLOR_G_MIN = 0;
let COLOR_B_MIN = 0;

let COLOR_R_MAX = 255;
let COLOR_G_MAX = 255;
let COLOR_B_MAX = 255;

var t = 1;

function calculateColor(min,max,x,y,t)
{
    let temp = 0;
    if(max < min)
    {
        temp = max;
        max = min;
        min = max;
    } 
    return min + max*Math.abs(Math.sin(Math.PI/180*(x+y+t)));
}

function animate() {
    requestAnimationFrame(animate);
    t += 1;

    for(var x = 0 ; x < MAX_ROW ; x++)
    {
        for(var y = 0 ; y < MAX_COL ; y++)
        {
            c.beginPath();
            r = calculateColor(0,255,x,y,t);
            g = calculateColor(0,128,x,y,t);
            b = calculateColor(128,255,x,y,t);
            //c.fillStyle = "rgb("+(255*Math.abs(Math.sin(Math.PI/180*(x+t))))+","+(255*Math.abs(Math.cos(Math.PI/180*(y+t))))+","+(255*Math.abs(Math.sin(Math.PI/180*(y+t))*Math.abs(Math.cos(Math.PI/180*(x+t)))))+")";
            //c.fillStyle = "rgb("+(255*Math.abs(Math.sin(Math.PI/180*(x+y+t))))+","+(255*Math.abs(Math.cos(Math.PI/180*(x+y+t))))+","+(255*Math.abs(Math.sin(Math.PI/180*(y+x+t))))+")";
            c.fillStyle = "rgb("+r+","+g+","+b+")";
            c.fillRect(x*innerWidth/MAX_COL,y*innerHeight/MAX_ROW,innerWidth/MAX_COL,innerHeight/MAX_ROW);
        }
    }
}

animate();
