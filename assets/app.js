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
var stringBottomX = mouseX;
var stringBottomY = mouseY;

function clear() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
};

function drawBalloon(x, y) {
  clear();
  drawBall(x, y);
  drawString(x, y);
};

function drawBall(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x,y-200,50,0,(2*Math.PI));
  ctx.fill();
};

function drawString(x, y) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(x,y-150);
  ctx.bezierCurveTo(x-20,y-125,x+20,y-75,x,y);
  ctx.stroke();
}

function floatUp(x, y) {
  if (y > 250) {
    y -= 2;
    droppedAtX = x;
    droppedAtY = y;
    drawBalloon(x, y);
    setTimeout(function() {floatUp(x, y)}, 10);
  }
};

function balloonPop(x, y) {
  if (y < canvas.height + 150) {
    clear();
    y += 3;
    drawString(x, y);
    setTimeout(function() {balloonPop(x, y)}, 10);
  } else {
    droppedAtX = canvas.width / 2;
    droppedAtY = canvas.height / 1.5;
    setTimeout(function() {drawBalloon(canvas.width/2, canvas.height/1.5)}, 2000);
  }
}

canvas.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (holding) {
    drawBalloon(mouseX, mouseY);
  };
});

canvas.addEventListener("mouseout", function(e) {
  window.cancelAnimationFrame(drawBalloon);
});

canvas.addEventListener("click", function(e) {
  if (holding) {
    droppedAtX = mouseX;
    droppedAtY = mouseY;
    holding = false;
    floatUp(droppedAtX, droppedAtY);
  } else {
    if ((mouseX > (droppedAtX - 20)) && (mouseX < (droppedAtX + 20)) && (mouseY < (droppedAtY + 20)) && (mouseY > (droppedAtY - 20))) {
      holding = true;
      drawBalloon(mouseX, mouseY);
    } else if (mouseX > droppedAtX - 50 && mouseX < droppedAtX + 50 && mouseY < droppedAtY - 150 && mouseY > droppedAtY - 250) {
      balloonPop(droppedAtX, droppedAtY);
    }
  }
});

drawBalloon(stringBottomX, stringBottomY);