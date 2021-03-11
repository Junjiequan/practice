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
let square = Array.from(document.querySelectorAll('.grid div'));
const Scoredisplay = document.getElementById('score');
const pauseBtn = document.getElementById('start-btn');
const audio = new Audio('./tetris.mp3');
let score = 0;
let dropTimer;
//tetromino
const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
//tetromino's color
const color = [
    'orange',
    'red',
    'yellowgreen',
    'purple',
    'blue'
]
//starting position && rotation
let currentPosition = 4;
let currentRotation = 0;


//random tetromino's shape selection
let random = Math.floor(Math.random() * theTetrominos.length);
let current = theTetrominos[random][currentRotation];
let afterRandom = 0

//play background music
const playAudio = ()=>{
    audio.loop = true;
    audio.play();
}
// playmusic = setInterval(playAudio, 1000);

//add the teromino
const draw = () =>{
    current.forEach(index => {
        square[currentPosition + index].classList.add('tetromino')
        square[currentPosition + index].style.backgroundColor = color[random]
    })
}

//remove the tetromino
const undraw = () =>{
    current.forEach(index=>{
        square[currentPosition + index].classList.remove('tetromino')
        square[currentPosition + index].style.backgroundColor = ''
    })
}

//tetromino drop action per second
const drop = () =>{
    if(pauseBtn.textContent === 'Pause' && Scoredisplay.textContent  !== 'NOOB'){
        undraw();
        currentPosition += width ;
        draw();
        stop();
    } 
}
console.log(Scoredisplay.innerText)
//Original drop interval here
// dropTimer = setInterval(drop, 1000);

//assign key function
const control = (e) =>{
    if(pauseBtn.textContent === 'Pause'){
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
}
document.addEventListener('keyup', control)


// tetromino stops at the buttom
const stop = () =>{
    let checktaken = current.some(index=> square[currentPosition + index + width].classList.contains('taken'));
    let checkempty = current.some(index=> square[currentPosition + index + width].classList.contains('empty'))
    // if the tetromino touches buttom change div class to taken
    if(checktaken || checkempty){
        current.forEach(index => square[currentPosition + index].classList.add('taken'));
        currentPosition -= width;
        //new tetromino starts to drop
        random = afterRandom;
        afterRandom = Math.floor(Math.random() * theTetrominos.length);
        current = theTetrominos[random][currentRotation];
        currentPosition = 4;
        draw();
        displayMiniTetromino();
        scorePlus();
        gameOver();
    } 
}
// key control //left
const moveLeft = () =>{
    if(pauseBtn.textContent === 'Pause'  && Scoredisplay.textContent  !== 'NOOB'){
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -=1 ;
        if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    } else return;
}
//right
const moveRight = () =>{
    if(pauseBtn.textContent === 'Pause'  && Scoredisplay.textContent  !== 'NOOB'){
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);
        if(!isAtRightEdge) currentPosition +=1 ;
        if(current.some(index=> square[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    } else return;
}
//rotate 
const rotate = () =>{
    if(pauseBtn.textContent === 'Pause' && Scoredisplay.textContent  !== 'NOOB' ){
        undraw();
        currentRotation++
        if(currentRotation == current.length) {
            currentRotation = 0;
        };
        current = theTetrominos[random][currentRotation];
        checkRotatedPosition();
        draw();
    } else return;
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
    [0, miniWidth, miniWidth*2, 1],                                     //L
    [0, miniWidth, miniWidth+1, miniWidth*2+1],                         //Z
    [miniWidth+1, miniWidth*2, miniWidth*2+1, miniWidth*2+2],           //T
    [miniWidth, miniWidth+1, miniWidth*2, miniWidth*2+1],               //O
    [1, miniWidth+1, miniWidth*2+1, miniWidth*3+1]                      //I
]

// display mini version
const displayMiniTetromino = () =>{
    displaySquare.forEach(index=>{
        index.classList.remove('mini-tetromino');
        index.style.backgroundColor= '';
    })
    nextTetrominos[afterRandom].forEach(index=>{
        displaySquare[displayIndex + index].classList.add('mini-tetromino');
        displaySquare[displayIndex + index].style.backgroundColor = color[afterRandom]
    })

}
// score display & remove row & add new row
const scorePlus = () => {
    for (let i = 0; i < 199; i += width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
        if(row.every(index=> square[index].classList.contains('taken'))){
            score += 100;
            Scoredisplay.textContent = score;
            row.forEach(index=>{
                square[index].classList.remove('taken')
                square[index].classList.remove('tetromino')
                square[index].style.backgroundColor = ''
            })
            const squareDelete = square.splice(i, width)
            square = squareDelete.concat(square)
             // this part is hard to understand // what is the purpose of appendChild here?-----------------
            square.forEach(index => grid.appendChild(index))
        }
    }
}
//game over
const gameOver = () =>{
    if(current.some(index => square[currentPosition + index].classList.contains('taken'))){
        square.forEach(index=>{
            if(index.classList.contains('tetromino')){
                index.classList.remove('tetromino');
                index.style.backgroundColor = ''
                index.classList.add('crashed')
            }
         }
        )
        Scoredisplay.textContent = 'NOOB'
        clearInterval(dropTimer);
    }
}
const gameClear = ()=>{
    square.forEach(index=> index.classList.remove('crashed'));
    square.forEach(index=> index.classList.remove('tetromino'));
    square.forEach(index=> index.classList.remove('taken'));
    square.forEach(index=> index.style.backgroundColor = '');
    currentPosition = 4;
    random = Math.floor(Math.random() * theTetrominos.length);
    afterRandom = Math.floor(Math.random() * theTetrominos.length);
    current = theTetrominos[random][currentRotation]
    Scoredisplay.innerHTML = '0'
    draw();
    clearInterval(dropTimer);
    dropTimer = setInterval(drop,300);
    displayMiniTetromino();
};

//start & stop button
const clickBtn = ()=>{
    if (pauseBtn.textContent ==='Start'){
        pauseBtn.textContent = "Pause";
        draw();
        clearInterval(dropTimer);
        dropTimer = setInterval(drop,300)
        displayMiniTetromino();
    } else {
        pauseBtn.textContent = "Start";
        clearInterval(dropTimer);
        dropTimer;
    }
}
// pause reset buttons
document.getElementById('reset-btn') .addEventListener('click', gameClear);
document.getElementById('start-btn') .addEventListener('click', clickBtn);

// control buttons
document.getElementById('left').addEventListener("click", moveLeft);
document.getElementById('down').addEventListener("click", drop);
document.getElementById('right').addEventListener("click", moveRight);
document.getElementById('up').addEventListener("click", rotate)
})

