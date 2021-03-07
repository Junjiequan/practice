const App = ()=>{
    
    const number = /[0-9.]/g
    const symbol = /[+-/*.]/
    const [output,setOutput] = React.useState("");
    const [result,setResult] = React.useState(0);

    const input = (symbols)=>{
        setOutput((prev) => prev + symbols);
        if (output[output.length-1] === '='){
            if (number.test(symbols)){
                setOutput(symbols)
            } else setOutput(result + symbols)
        }

        if(symbol.test(output[output.length-1]) && symbol.test(output[output.length-2])){
           setOutput('计算器都用不好吗')
           console.log(setResult('按AC重来'))
            }   
    }
    const calculate = () =>{
        setResult(eval(output))
        setOutput((prev)=> prev + "=")

    }
    const clear = ()=>{
        setOutput((prev)=> prev.split("").slice(0,prev.length-1).join(""));
        
    }
    const clearAll =()=>{
        setResult(0);
        setOutput("");
    }
    return (
        <>
        <div className="container">
            <div className="bg-dark text-white grid-container">
                <div  className="button output">
                    <input type="text" value={output} placeholder="0" disabled/>
                    <br/>
                    <input type="text" value={result}  disabled placeholder="1"/>
                </div>
                <div onClick={clearAll} className="button AC">AC</div>
                <div onClick={clear} className="button C">C</div>
                <div onClick={()=> input("/")} className="button symbol-color slash">/</div>
                <div onClick={()=> input("*")} className="button symbol-color times">X</div>
                <div onClick={()=> input("7")} className="button number-color seven">7</div>
                <div onClick={()=> input("8")} className="button number-color eight">8</div>
                <div onClick={()=> input("9")} className="button number-color nine">9</div>
                <div onClick={()=> input("-")} className="button symbol-color minus">-</div>
                <div onClick={()=> input("4")} className="button number-color four">4</div>
                <div onClick={()=> input("5")} className="button number-color five">5</div>
                <div onClick={()=> input("6")} className="button number-color siv">6</div>
                <div onClick={()=> input("+")} className="button symbol-color plus">+</div>
                <div onClick={()=> input("1")} className="button number-color one">1</div>
                <div onClick={()=> input("2")} className="button number-color two">2</div>
                <div onClick={()=> input("3")} className="button number-color three">3</div>
                <div onClick={()=> input("0")} className="button number-color zero">0</div>
                <div onClick={()=> input(".")} className="button number-color dot">.</div>
                <div onClick={calculate} className="button equal">=</div>
            </div>
        </div>
        </>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))