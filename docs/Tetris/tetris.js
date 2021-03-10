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
]
    
const grid = document.querySelector('.grid');
var squares = document.querySelectorAll('.grid div');
const Scoredisplay = document.querySelector('#score');
const Startbtn = document.querySelector('#start-btn');

const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let current = theTetrominos[0][0];

//first rotation in the first tetromino
const draw = () =>{
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
    })
}
draw();

grid.classList.add("tetromino")
console.log(current)
























})