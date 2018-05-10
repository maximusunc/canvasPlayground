const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var holding = false;
var mouseX = canvas.width/2;
var mouseY = canvas.height/1.5;
var mouseIn = false;
var droppedAtX = mouseX;
var droppedAtY = mouseY;

function draw(x, y) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBalloon(x, y);
};

function drawBalloon(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x,y-200,50,0,(2*Math.PI));
  ctx.fill();
  
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(x,y-150);
  ctx.bezierCurveTo(x-20,y-125,x+20,y-75,x,y);
  ctx.stroke();
};

function floatUp(x, y) {
  if (y > 250) {
    y -= 2;
    droppedAtX = x;
    droppedAtY = y;
    draw(x, y);
    setTimeout(function() {floatUp(x, y)}, 10);
  }
}

function getMousePos(canvas, e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
};

canvas.addEventListener("mousemove", function(e) {
  var mousePos = getMousePos(canvas, e);
  mouseX = mousePos.x;
  mouseY = mousePos.y;
  if (holding) {
    draw(mouseX, mouseY);
  };
});

canvas.addEventListener("mouseout", function(e) {
  window.cancelAnimationFrame(draw);
});

canvas.addEventListener("click", function(e) {
  if (holding) {
    console.log("let go");
    droppedAtX = mouseX;
    droppedAtY = mouseY;
    holding = false;
    floatUp(droppedAtX, droppedAtY);
  } else {
    if ((mouseX > (droppedAtX - 20)) && (mouseX < (droppedAtX + 20)) && (mouseY < (droppedAtY + 20)) && (mouseY > (droppedAtY - 20))) {
      console.log("holding");
      holding = true;
      draw(mouseX, mouseY);
    } else {
      console.log("not the string");
    }
  }
});

draw(mouseX, mouseY);