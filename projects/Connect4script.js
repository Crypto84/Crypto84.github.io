function setup() {
  createCanvas(701, 601);
}
function draw() {
  drawGrid();
  drawIcon();
  winCheck();
}
var grid = [[0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0]];
var player = 1;
function drawGrid() {
  background(0);
  for (i=0; i<=9; i++) {
    strokeWeight(10);
    stroke(214, 9, 237);
    line(i*100, 0, i*100, 600);
  }
  for (i=0; i<=8; i++) {
    line(0, i*100, 700, i*100);
  }
}
function mouseClicked(){
  player*=-1;
  var xPos = floor(mouseX/100);
  for (i=5; i>=0; i--) {
    if (grid[i][xPos] == 0) {
      grid[i][xPos] = player;
      console.log(grid);
      break;
    }
  }
}
function drawIcon() {
  for(i=0; i<6; i++) {
    for(j=0; j<7; j++) {
      if (grid[i][j] == 1) {
        noStroke();
        fill(2, 221, 255);
        ellipse(j*100 + 50, i*100 + 50, 75, 75);
      } else if (grid[i][j] == -1) {
        noStroke();
        fill(255, 221, 255);
        ellipse(j*100 + 50, i*100 + 50, 75, 75);
      }
    }
  }
}
function winCheck() {
  //horistonal
  for(i=0; i<6; i++) {
    for(j=0; j<4; j++) {
      if (grid[i][j] + grid[i][j+1] + grid[i][j+2] + grid[i][j+3] == 4 || grid[i][j] + grid[i][j+1] + grid[i][j+2] + grid[i][j+3] == -4) {
        textSize(40);
        fill(255);
        text("Player" + player + "wins!", 350, 300);
      }
    }
  }
  //vertical
  for(j=0; j<7; j++) {
    for(i=0; i<3; i++) {
      if (grid[i][j] + grid[i+1][j] + grid[i+2][j] + grid[i+3][j] == 4 || grid[i][j] + grid[i+1][j] + grid[i+2][j] + grid[i+3][j] == -4) {
        textSize(40);
        fill(255);
        text("Player" + player + "wins!", 350, 300);
      }
    }
  }
  //topRightDiagonal
  for(i=3; i<6; i++) {
    for(j=0; j<4; j++) {
      if (grid[i][j] + grid[i-1][j+1] + grid[i-2][j+2] + grid[i-3][j+3] == 4 || grid[i][j] + grid[i-1][j+1] + grid[i-2][j+2] + grid[i-3][j+3] == -4) {
        textSize(40);
        fill(255);
        text("Player" + player + "wins!", 350, 300);
      }
    }
  }
  //topLeftDiagonal
  for(i=3; i<6; i++) {
    for (j=3; j<7; j++) {
      if (grid[i][j] + grid[i-1][j-1] + grid[i-2][j-2] + grid[i-3][j-3] == 4 || grid[i][j] + grid[i-1][j-1] + grid[i-2][j-2] + grid[i-3][j-3] == -4) {
        textSize(40);
        fill(255);
        text("Player" + player + "wins!", 350, 300);
      }
    }
  }
}