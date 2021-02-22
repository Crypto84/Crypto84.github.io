var size;
var board = [];
var length;
var flagMode = false;

function setup() {
  createCanvas(1000, 1000);
}
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.bomb = false;
    this.clicked = false;
    this.flag = false;
  }
  //draws the cell
  drawCell() {
    if (this.flag) {
      fill(255, 0, 0);
    }
    else if (this.clicked) {
      fill(255);
    }
    else {
      fill("silver");
    }
    strokeWeight(2);
    stroke(0);
    rect(this.i*40, this.j*40, 40, 40);
    if (this.clicked && this.numberOfBombs != 0) {
      fill(0);
      textSize(32);
      text(this.numberOfBombs, this.i*40 + 10, this.j*40 + 30);
    }
  }
  calculateBombs() {
    this.clicked = true;
    this.numberOfBombs = 0;
    this.startI = this.i - 1;
    this.startJ = this.j - 1;
    this.endI = this.i + 1;
    this.endJ = this.j + 1;
    if (this.startI < 0) {this.startI = this.i};
    if (this.startJ < 0) {this.startJ = this.j};
    if (this.endI > length-1) {this.endI = this.i};
    if (this.endJ > length-1) {this.endJ = this.j};
    for (let j = this.startJ; j<=this.endJ; j++) {
      for (let i = this.startI; i<=this.endI; i++) {
        if (board[j][i].bomb) {
          this.numberOfBombs +=1
        }
      }
    }
    if (this.numberOfBombs != 0) {
      return;
    }
    else {
      for (let j = this.startJ; j<=this.endJ; j++) {
        for (let i = this.startI; i<=this.endI; i++) {
          if (!board[j][i].clicked) {
            board[j][i].calculateBombs();
          }
        }
      }
    }
  }
  //what happens when you click on a cell
  checkPress(state) {
    if (collidePointRect(mouseX, mouseY, this.i*40, this.j*40, 40, 40)) {
      if (state == 0) {
        if (this.flag) {
          return;
        }
        if (this.bomb) {
          console.log("game over.")
        }
        //calculates number of bombs adjacent
        else {
          this.calculateBombs();
        }
      }
      else if (state == 1) {
        this.flag = !this.flag;
      }
    }
  }
}
function createGrid() {
  size = "s";
  let row = [];
  //declaring size of board
  if (size == "s") {
    length = 12;
  }
  //creating 2d grid array
  for (var j=0; j<length; j++) {
    for (var i=0; i<length; i++) {
      row.push(new Cell(i, j));
    }
    board.push(row);
    row = [];
  }
  //randomly selecting which cells to be bombs
  for (var count=0; count<length; count++) {
    while (true) {
      var i = Math.floor(Math.random()*length);
      var j = Math.floor(Math.random()*length);
      if (board[j][i].bomb == false) {
        break;
      }
    }
    board[j][i].bomb = true;
  }
}
createGrid();
function draw() {
  //draws each cell
  for (var j=0; j<board.length; j++) {
    for (var i=0; i<board.length; i++) {
      board[j][i].drawCell();
    }
  }
  checkWin();
}

function flag() {
  flagMode = !flagMode;
}

function checkWin() {
  let bombCount = 0;
  let count = 0;
  for (var j = 0; j<length; j++) {
    for (var i = 0; i<length; i++) {
      if (board[i][j].bomb && board[i][j].flag) {
        bombCount += 1;
      }
      if (board[i][j].clicked) {count += 1}
    }
  }
  if (bombCount == length) {console.log("you win!")}
  if (count == length*length) {console.log("you win!")}
}

//handles mouseclick
function mouseClicked() {
  if (!flagMode) {
    for (var j = 0; j<length; j++) {
      for (var i=0; i<length; i++) {
        board[j][i].checkPress(0);
      }
    }
  }
  else if (flagMode) {
    for (var j = 0; j<length; j++) {
      for (var i=0; i<length; i++) {
        board[j][i].checkPress(1);
      }
    }
  }
}