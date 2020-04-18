var canvas =  document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const MAX_COL = 100;
const MAX_ROW = 100;
const COLOR_CHANGE_SPEED_MAX = 5;
const COLOR_CHANGE_SPEED_MIN = 1;
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

// var r = Math.random() * 255;
// var g = Math.random() * 255;
// var b = Math.random() * 255;

// var rAdd, gAdd, bAdd = true;

var time = 1;
function animate() {
    requestAnimationFrame(animate);
    t++;
    // (rAdd) ? r += COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN) : r -= COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN);
    // if(r >= 255 || r <= 0) rAdd=!rAdd;
    
    // (gAdd) ? g += COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN) : g -= COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN);
    // if(g >= 255 || g <= 0) gAdd=!gAdd;

    // (bAdd) ? b += COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN) : b -= COLOR_CHANGE_SPEED_MIN + Math.random() * (COLOR_CHANGE_SPEED_MAX - COLOR_CHANGE_SPEED_MIN);
    // if(b >= 255 || b <= 0) bAdd=!bAdd;

    for(var x = 0 ; x < MAX_ROW ; x++)
    {
        for(var y = 0 ; y < MAX_COL ; y++)
        {
            c.beginPath();
            //c.fillStyle = "rgb("+r/MAX_COL*x+","+g/MAX_COL*x+","+b/MAX_COL*x+")";
            c.fillStyle = "rgb("+(255*Math.abs(Math.sin(x+t)))+","+(255*Math.abs(Math.cos(y+t)))+","+(255*Math.abs(Math.tan(x+y*t)))+")";
            c.fillRect(x*innerWidth/MAX_COL,y*innerHeight/MAX_ROW,innerWidth/MAX_COL,innerHeight/MAX_ROW);
        }
    }
}

animate();
