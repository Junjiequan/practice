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
    else outputNum.innerText = formatNum(num);
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
const getSymArrays = Array.from(document.getElementsByClassName('symbols'));


const keyBoardSym = ()=>{
    getSymArrays.map((symbols) =>{
        symbols.addEventListener('click',()=>{
            alert('clicked:'+ symbols.id);
        })
    })
}
const keyBoardNum = () =>{
    getNumArrays.map((numbers)=>{
        numbers.addEventListener('click',()=>{
                alert("clicked: "+ numbers.id)
            })
        })
    } 
keyBoardNum();
keyBoardSym();