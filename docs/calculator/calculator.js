const App = ()=>{
    const number = /[0-9]/g;
    const symbols = /[/+*=]/;
    const dot = /[.-]/;
    const dotOnly = /[.]/;
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
             if(dotOnly.test(element)){
                if (dotOnly.test(checkArr[checkArr.length-2])){
                    alert("别乱按，会弄坏计算器的")
                    setOutput('')
                }
            }
    }
    const calculator = () =>{
        setResult(eval(output))
    }
    const clear = ()=>{
        setOutput((prev)=> prev.split("").slice(0,prev.length-1).join(""));
        
    }
    const clearAll =()=>{
        setResult(0);
        setOutput("");
    }
    React.useEffect(()=>{
        document.addEventListener("keydown", handleKeydown)
        return ()=>{
            document.removeEventListener("keydown", handleKeydown)
        }
    })
    const handleKeydown = (e) =>{
        if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) 
        || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 106 || e.keyCode == 111){
            setOutput((prev) => prev + e.key);
        } else if ((e.keyCode == 13)){
            setResult (eval(output));
        }
    }
    return (
        <div className="container">
            <div className="back-color text-white grid-container ">
                <div className="title text-center"><h3>Damaged Calculator</h3></div>
                <div  className="button output">
                    <input className="output-1"type="text" value={output}  disabled/>
                    <br/>
                    <input className="output-2"type="text" value={result} placeholder="0" disabled />
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
                <div onClick={calculator} className="button equal">=</div>
            </div>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))