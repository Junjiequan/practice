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
    else if(outputNum.innerText.length <= 14){
        return outputNum.innerText = formatNum(num)
    }
}
const formatNum = (num) =>{
    if(isNaN(num)) return '';
    let typeNumber = Number(num);
    let value = typeNumber.toLocaleString('en');
    return value;
}
const reverseformatNum = (num) =>{
    return num.replace(/,/g,'');
}
//controlKey section
const getNumArrays = Array.from(document.getElementsByClassName('number'));
const getSOperatorArrays = Array.from(document.getElementsByClassName('operator'));
const getSymArrays = Array.from(document.getElementsByClassName('symbols'));

const keyBoardOperator = () =>{
    getSOperatorArrays.map((operator) =>{
        operator.addEventListener('click',()=>{
            let outputNum = reverseformatNum(getOutputNum());
            let prevNum = getPrevNumber();
            if( outputNum != ''){
                  prevNum = prevNum + outputNum;
                 if(operator.innerText == '='){
                    if(!isNaN(prevNum[prevNum.length-1])){
                        let result = eval(prevNum);
                        let resultString = result.toString();
                        if(resultString.length >= 14 ){
                             printOutputNum(resultString.slice(0,13));
                             printPrevNumber('');
                        } else {
                            printOutputNum(result);
                            printPrevNumber('');
                            outputNum.classList.add('occupied')
                        }
                    }  
                 }  else {
                    prevNum = prevNum + operator.innerText
                    printPrevNumber(prevNum);
                    printOutputNum('');
                 }
            }else if (outputNum == ''){
                if(operator.innerText != '='){
                    let savedNum = historyNum.innerText;
                    let replaceLast = savedNum.slice(0,-1);
                    printPrevNumber(replaceLast + operator.innerText);
                } else {
                    let replaceLast = prevNum.slice(0,-1);  
                    let result = eval(replaceLast);
                    printOutputNum(result);
                    printPrevNumber('');
                }
            }

        })
    })
}
const keyBoardSym = () =>{
    getSymArrays.map((symbols) =>{
        symbols.addEventListener('click', ()=>{
            if(symbols.id == 'clear'){
                printOutputNum('');
                printPrevNumber('');
            }
            else if(symbols.id == 'clearEach'){
                let outputNum = reverseformatNum(getOutputNum());
                let result = outputNum.slice(0,-1);
                printOutputNum(result);
            }
        })
    })
}
const keyBoardNum = () =>{
        getNumArrays.map((numbers)=>{
            numbers.addEventListener('click', ()=>{
                if(outputNum.classList.contains('occupied')){
                    outputNum.classList.remove('occupied');
                    printOutputNum('');
                    printOutputNum(numbers.innerText);
                }   else {
                    let flattenNumber = reverseformatNum(getOutputNum());
                    flattenNumber += numbers.innerText;
                    printOutputNum( flattenNumber );
                }
                })
            })
    } 
keyBoardNum();
keyBoardOperator();
keyBoardSym();