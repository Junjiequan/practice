class App extends React.Component{
        constructor(props){
            super(props);

            this.state={
                this: null
            }
        }


        render(){
            return (
                <div class="main">
                     {/* button */}
                    <div class="buttons row">
                        <div class="btn-box">
                            <div class="col-3 drum-pad drum-pad btn btn-primary m-1 " id="drum-0">Q
                            <audio src="./clip/" class="clip" id ="Q"></audio></div>
                            <div class="col-3 drum-pad btn btn-dark m-1 " id="drum-1">W
                            <audio src="./clip/" class="clip" id ="W"></audio></div>
                            <div class="col-3 drum-pad btn btn-secondary m-1" id="drum-2">E
                            <audio src="./clip/" class="clip" id ="E"></audio></div>
                        </div>
                        <div class="btn-box">
                            <div class="col-3 drum-pad btn btn-info m-1" id="drum-3">A
                            <audio src="./clip/" class="clip" id ="A"></audio></div>
                            <div class="col-3 drum-pad btn btn-success m-1" id="drum-4">S
                            <audio src="./clip/" class="clip" id ="S"></audio></div>
                            <div class="col-3 drum-pad btn btn-primary m-1" id="drum-5">D
                            <audio src="./clip/" class="clip" id ="D"></audio></div>
                        </div>
                        <div class="btn-box">
                            <div class="col-3 drum-pad btn btn-danger m-1" id="drum-6">Z
                            <audio src="./clip/" class="clip" id ="Z"></audio></div>
                            <div class="col-3 drum-pad btn btn-dark m-1" id="drum-7">X
                            <audio src="./clip/" class="clip" id ="X"></audio></div>
                            <div class="col-3 drum-pad btn btn-warning m-1" id="drum-8">C
                            <audio src="./clip/" class="clip" id ="C"></audio></div>
                        </div>
                    </div>
                    {/* control */}
                    <div class="row"></div>
                </div>

            )
        }

}

ReactDOM.render(<App />, document.getElementById('app'))