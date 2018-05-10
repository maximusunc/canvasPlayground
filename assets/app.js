const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = canvas.width;
var y = canvas.height;

function balloon() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x/2,y/2,50,0,(2*Math.PI));
  ctx.fill();
  
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(x/2,y/2+50);
  ctx.bezierCurveTo(x/2-20,y/2+75,x/2+20,y/2+125,x/2,y/2+150);
  ctx.stroke();

  
  if (y < 100) {
    console.log("reached the top");
  } else {
    y -= 5;
    requestAnimationFrame(balloon);
  };
};

balloon();


