const App = ()=>{
    return (
        <div className="container">
            <div className="bg-dark text-white grid-container">
                <div className="button input">0123</div>
                <div onClick={} className="button AC">AC</div>
                <div onClick={} className="button symbol-color slash">/</div>
                <div onClick={} className="button symbol-color times">X</div>
                <div onClick={} className="button number-color seven">7</div>
                <div onClick={} className="button number-color eight">8</div>
                <div onClick={} className="button number-color nine">9</div>
                <div onClick={} className="button symbol-color minus">-</div>
                <div onClick={} className="button number-color four">4</div>
                <div onClick={} className="button number-color five">5</div>
                <div onClick={} className="button number-color siv">6</div>
                <div onClick={} className="button symbol-color plus">+</div>
                <div onClick={} className="button number-color one">1</div>
                <div onClick={} className="button number-color two">2</div>
                <div onClick={} className="button number-color three">3</div>
                <div onClick={} className="button number-color zero">0</div>
                <div onClick={} className="button number-color dot">.</div>
                <div onClick={} className="button equal">=</div>
            </div>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))