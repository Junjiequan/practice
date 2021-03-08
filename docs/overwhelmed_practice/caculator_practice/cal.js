const App = ()=>{
    const number = /[0-9]/g
    const symbols = /[/+*=]/
    const dot = /[.-]/
    const [output, setOutput]= React.useState("");
    const [result,setResult] = React.useState(0);
    const input = (element) =>{
        setOutput((prev) => prev + element);
         let checkArr = output.split("");
            if (symbols.test(element)){
                if(symbols.test(checkArr[checkArr.length-1])){
                    checkArr[checkArr.length-1] = element;
                    setOutput(checkArr.join(""))
                }
             }
             if(dot.test(checkArr[checkArr.length-1])){
                 if(!number.test(element)){
                    let element = '';
                    setOutput(checkArr.slice(0,checkArr.length-1).join(''))
                 }
             }
             if(dot.test(element)){
                if (dot.test(checkArr[checkArr.length-2])){
                    alert("There's no such a number")
                }
            }
    }
    const calculator = () =>{
        setResult(eval(output))
    }

    const clearAll = ()=>{
        setOutput("")
        setResult('')
    }
    return (
        <div className="container">
            <div className="calculator">
                <div className="output w-100">
                    <input value={output} className="text" disabled/>
                </div>
                <div className="result w-100">
                    <input value={result} className="" placeholder="0" disabled/>
                </div>
                <div onClick={clearAll}className="element ac">AC</div>
                <div onClick={()=> input('/')} className="element slash">/</div>
                <div onClick={()=> input('*')}className="element times">X</div>
                <div onClick={()=> input('7')}className="element seven">7</div>
                <div onClick={()=> input('8')}className="element eight">8</div>
                <div onClick={()=> input('9')}className="element nine">9</div>
                <div onClick={()=> input('-')}className="element minus">-</div>
                <div onClick={()=> input('4')}className="element four">4</div>
                <div onClick={()=> input('5')}className="element five">5</div>
                <div onClick={()=> input('6')}className="element six">6</div>
                <div onClick={()=> input('+')}className="element plus">+</div>
                <div onClick={()=> input('1')}className="element one">1</div>
                <div onClick={()=> input('2')}className="element two">2</div>
                <div onClick={()=> input('3')}className="element three">3</div>
                <div onClick={()=> input('0')}className="element zero">0</div>
                <div onClick={()=> input('.')}className="element dot">.</div>
                <div onClick={calculator}className="element equal">=</div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))