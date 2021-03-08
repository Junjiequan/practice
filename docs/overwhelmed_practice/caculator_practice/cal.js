const App = ()=>{
    return (
        <div className="container">
            <div className="calculator">
                <div className="output w-100">
                    <input className="text" placeholder="123"/>
                </div>
                <div className="result w-100">
                    <input className="" placeholder="1"/>
                </div>
                <div className="element ac">AC</div>
                <div className="element slash">/</div>
                <div className="element times">X</div>
                <div className="element seven">7</div>
                <div className="element eight">8</div>
                <div className="element nine">9</div>
                <div className="element minus">-</div>
                <div className="element four">4</div>
                <div className="element five">5</div>
                <div className="element six">6</div>
                <div className="element plus">+</div>
                <div className="element one">1</div>
                <div className="element two">2</div>
                <div className="element three">3</div>
                <div className="element zero">0</div>
                <div className="element dot">.</div>
                <div className="element equal">=</div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))