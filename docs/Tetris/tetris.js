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
let afterRandom = 0

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
        random = afterRandom;
        afterRandom = Math.floor(Math.random() * theTetrominos.length);
        current = theTetrominos[random][currentRotation];
        currentPosition = 4;
        draw();
        displayMiniTetromino()
    } 
}

// key control //left
const moveLeft = () =>{
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if(!isAtLeftEdge) currentPosition -=1 ;
    if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
    }
    draw();
}
//right
const moveRight = () =>{
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);
    if(!isAtRightEdge) currentPosition +=1 ;
    if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }
    draw();
}
//rotate 
const rotate = () =>{
    undraw();
    currentRotation++
    if(currentRotation == current.length) {
        currentRotation = 0;
    };
    current = theTetrominos[random][currentRotation];
    checkRotatedPosition();
    draw();
}
//rotationCheck      //this part is a little bit confusing, but I did comprehend it. good job. 
const checkLeft = () =>{   // check if rotation transfered the tetromino to previous line  e.g.,   20  => 19 
     return current.some(index=> (currentPosition + index + 1) % width === 0)
}
const checkRight = () =>{   // check if rotation transfered the tetromino to next line  e.g.,   19 => 20 
     return current.some(index=> (currentPosition + index) % width === 0)
}
const checkRotatedPosition = (position)=>{
    position = position || currentPosition  
    if((position + 1) % width < 4){ //check if currentTetromino located in right side
        if(checkLeft()){
            currentPosition += 1   //push back to right
            checkRotatedPosition(position)
        }
    }
// [10,11,12,13,14,15,16,17,18,19]
// [20,21,22,23,24,25,26,27,28,29]
// when position = 26, 26 % 10 = 6, 6 > 5, so currenTetromino on the right side
    else if (position % width > 5){     //check if currentTetromino located in left side
        if(checkRight()){
            currentPosition -= 1  //push back to left
            checkRotatedPosition(position)
        }
    }
}

//----------------some additional features----------------
//display mini tetromino in the show-tetromino box
const displaySquare = document.querySelectorAll('.show-tetromino div');
const  miniWidth= 4;
let displayIndex = 1;

// mini-Tetrominos
const nextTetrominos = [
    [1, miniWidth+1, miniWidth*2+1, 2],                 //L
    [0, miniWidth, miniWidth+1, miniWidth*2+1],         //Z
    [1, miniWidth, miniWidth+1, miniWidth+2],           //T
    [0, 1, miniWidth, miniWidth+1],                     //O
    [1, miniWidth+1, miniWidth*2+1, miniWidth*3+1]      //I
]

// display mini version
const displayMiniTetromino = () =>{
    displaySquare.forEach(index=>{
        index.classList.remove('mini-tetromino')
    })
    nextTetrominos[random].forEach(index=>{
        displaySquare[displayIndex + index].classList.add('mini-tetromino')
    })

}

// continue here










// control buttons
document.getElementById('left').addEventListener("click", function(){
    moveLeft()
})
document.getElementById('down').addEventListener("click", function(){
    drop()
})
document.getElementById('right').addEventListener("click", function(){
    moveRight()
})
document.getElementById('up').addEventListener("click", function(){
    rotate()
})
})