const App = () =>{
    const [sessiontime, setSessiontime] = React.useState(5);
    const [breaklength, setBreaklength] = React.useState(5);
    const [sessionlength, setSessionlength] = React.useState(5);
    const [addtime, setAddtime] = React.useState(false);
    const [pause, setPause] = React.useState(false);

    const runTime = (time) =>{
        let minutes = Math.floor(time /60);
        let seconds = time % 60;
        return (
            ( minutes < 10 ? "0" + minutes : minutes) + ":" +
            ( seconds < 10 ? "0" + seconds : seconds)
        )
    };
    const startTime = () =>{
        // too hard 
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        if (!addtime) {
            let interval = setInterval(()=>{
                date = new Date().getTime();
                if ( date > nextDate) {
                    setSessiontime(prev=>{
                    return prev - 1;
                    });
                    nextDate += second;
                    console.log(nextDate)
                } else if ( nextDate < 3 && data == 0){
                    return ;
                }
            }, 30);
            console.log(interval)
            localStorage.clear();
            localStorage.setItem("interval-id", interval);
        }
        if(addtime){
            clearInterval(localStorage.getItem("interval-id"));
        }
        setAddtime(!addtime)
        //too hard
    }
    const changeBreak = (amount) =>{
        if( breaklength <= 60 && amount < 0 ) {
            return
        }
        if (!addtime){
            setBreaklength(prev => prev+ amount);
        }
    };
    const changeSession = (amount) =>{
        if( sessionlength <= 60 && amount < 0 ) {
            return
        }
        if(!addtime){
            setSessionlength(prev => prev+ amount);
            setSessiontime(sessionlength + amount);
        } 
    }
    const reSet = ()=>{
        setSessiontime(25*60);
        setBreaklength(5*60);
        setSessionlength(25*60);
    }
    return (
        <div className="container">
            <div className="text-center">
                <div ><h1>25 + 5 Clock</h1></div>
                <div className="d-flex mt-2 ">
                    <Left 
                    title="Break length"
                    changeTime= {changeBreak}
                    time = {breaklength}
                    runTime = {runTime}
                    />
                    <Right 
                    title="Session length"
                    changeTime= {changeSession}
                    time = {sessionlength}
                    runTime = {runTime}
                    />
                </div>
                <div className="session-time  mt-2">
                    <h4>Session</h4>
                    <p className="display-2">{runTime(sessiontime)}</p>
                        <button onClick={startTime} className="btn btn-dark p-2 m-3 mt-0">{addtime ? <div>stop</div> : <div>play</div>}</button>
                        <button onClick={reSet}className="btn btn-danger p-2 m-3 mt-0" >reset</button>
                </div>
            </div>
        </div>
    )
}
const Left = ({title, changeTime,time,runTime})=>{
    return (
            <div className="m-4 text-center">
                <h4>{title}</h4>
                <button onClick={()=> changeTime(-60, time )} className="btn btn-primary p-4 m-3"></button>
                <span className="h4">{runTime(time)}</span>
                <button onClick={()=> changeTime(+60, time)} className="btn btn-danger p-4 m-3"></button>
            </div>
    )
}
const Right = ({title, changeTime,time,runTime})=>{
    return (
            <div className="m-4 text-center">
                <h4>{title}</h4>
                <button onClick={()=> changeTime(-60, time )} className="btn btn-primary p-4 m-3"></button>
                <span className="h4">{runTime(time)}</span>
                <button onClick={()=> changeTime(+60, time)} className="btn btn-danger p-4 m-3"></button>
            </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))