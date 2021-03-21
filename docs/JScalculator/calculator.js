const historyNum = document.getElementById('inputsave');
const outputNum = document.getElementById('output');

// Output section
const getPrevNumber = () =>{
    return historyNum.innerText;
}
const printPrevNumber = (num) =>{
    historyNum.innerText = num;
}
const getOutputNum = () =>{
    return outputNum.innerText;
}
const printOutputNum = (num) =>{
    if(num == '') outputNum.innerText = num;
    else outputNum.innerText = formatNum(num).substring(0,11);
}
const formatNum = (num) =>{
    let typeNumber = Number(num);
    let value = typeNumber.toLocaleString('en');
    return value;
}
const reverseformatNum = (num) =>{
    return num.replace(/,/g,'');
}

//control section
const getNumArrays = Array.from(document.getElementsByClassName('number'));
const getSOperatorArrays = Array.from(document.getElementsByClassName('operator'));
const getSymArrays = Array.from(document.getElementsByClassName('symbols'))


const keyBoardOperator = ()=>{
    getSOperatorArrays.map((operator) =>{
        operator.addEventListener('click',()=>{
            outputNum.innerText += operator.innerText
        })
    })
}
const keyBoardSym = () =>{
    getSymArrays.map((symbols) =>{
        symbols.addEventListener('click', ()=>{
            printOutputNum('');
        })
    })
}
const keyBoardNum = () =>{
    getNumArrays.map((numbers)=>{
        numbers.addEventListener('click', ()=>{
            let convertStrToNum = reverseformatNum()

            })
        })
    } 
keyBoardNum();
keyBoardOperator();
keyBoardSym();