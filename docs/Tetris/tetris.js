document.addEventListener('DOMContentLoaded', ()=>{
//Tetromino shape //5 types->[L,Z,T,O,I]
const width = 10;
const lTetromino = [
    [1, width+1, width*2+1, 2],                 //rotation1
    [width, width+1, width+2, width*2+2],       //rotation2
    [1, width+1, width*2+1, width*2],           //ratation3
    [width, width*2, width*2+1,width*2+2],      //rotation4
];
const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
];
const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
];
const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
];
const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
];

//select tags from html 
const grid = document.querySelector('.grid');
let square = document.querySelectorAll('.grid div');
const Scoredisplay = document.querySelector('#score');
const Startbtn = document.querySelector('#start-btn');
//tetromino
const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

//starting position && rotation
let currentPosition = 4;
let currentRotation = 0;

//random tetromino's shape selection
let random = Math.floor(Math.random() * theTetrominos.length);
let current = theTetrominos[random][currentRotation];

//add the teromino
const draw = () =>{
    current.forEach(index => {
        square[currentPosition + index].classList.add('tetromino')
    })
}

//remove the tetromino
const undraw = () =>{
    current.forEach(index=>{
        square[currentPosition + index].classList.remove('tetromino')
    })
}

//tetromino drop action per second
const drop = () =>{
    undraw();
    currentPosition += width ;
    draw();
    stop();
}
//run function
timerId = setInterval(drop, 1000);  // --------------------------------------------------------------here

//assign key function
const control = (e) =>{
    if(e.keyCode === 37){
        moveLeft()
    } else if (e.keyCode === 38){
        rotate()
    } else if (e.keyCode === 39){
        moveRight()
    } else if (e.keyCode === 40){
        drop()
    }
}
document.addEventListener('keydown', control)

// tetromino stops at the buttom
const stop = () =>{
    // if the tetromino touches buttom change div class to taken
    if(current.some(index=> square[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => square[currentPosition + index].classList.add('taken'));
        //new tetromino starts to drop
        random = Math.floor(Math.random() * theTetrominos.length);
        current = theTetrominos[random][currentRotation];
        currentPosition = 4;
        draw();
    }
}

// key control
const moveLeft = () =>{
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if(!isAtLeftEdge) currentPosition -=1 ;
    if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
    }
    draw();
}
const moveRight = () =>{
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);
    if(!isAtRightEdge) currentPosition +=1 ;
    if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }
    draw();
}
const rotate = () =>{
    undraw();
    currentRotation++
    if(currentRotation == current.length) {
        currentRotation = 0;
    };
    current = theTetrominos[random][currentRotation];
    draw();
}















})