const App = () =>{
    const [sessiontime, setSessiontime] = React.useState(25*60);
    const [breaklength, setBreaklength] = React.useState(5*60);
    const [sessionlength, setSessionlength] = React.useState(25*60);
    const [addtime, setAddtime] = React.useState(false);
    const [pause, setPause] = React.useState(false);
    const [audio, setAudio] = React.useState(new Audio("./audio.wav"));
    const [color,setColor] = React.useState({color:'white'});
    console.log(addtime)
    const playAudio = ()=>{
        audio.currentTime = 0;
        audio.play();
        // setTimeout(()=> {audio.pause()}, 2000);
    }
    const pauseaudio = ()=>{
        audio.pause()
    }
    const runTime = (time) =>{
        let minutes = Math.floor(time /60);
        let seconds = time % 60;
        return (
            ( minutes < 10 ? "0" + minutes : minutes) + ":" +
            ( seconds < 10 ? "0" + seconds : seconds)
        )
    };
    const startTime = () =>{
        setAddtime(!addtime)
        // too hard 
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime()
        let stop = pause;
        if (!addtime) {
            let interval = setInterval(()=>{
                date = new Date().getTime();
                if ( date > nextDate) {
                    setSessiontime(prev=>{
                        if(prev <= 0 && !stop ){
                            playAudio();
                            stop = true;
                            setPause(true);
                            return breaklength;
                        } else if (prev <=0 && stop){
                            playAudio();
                            stop = false;
                            setPause(false);
                            return sessionlength;
                        } else if (prev <=60 ){
                            setColor({color:'red'})
                        } else if (prev > 60 ){
                            setColor({color:'white'})
                        }   
                    return prev - 1;
                    });
                }
            }, 1000);
            localStorage.clear();
            localStorage.setItem("interval-id", interval);

        }
        if(addtime){
            clearInterval(localStorage.getItem("interval-id"));
        }
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
        setColor({color:'white'});
    }
    return (
        <div className="text-center d-flex justify-content-center align-items-center min-vh-100">
            <div className="time-box shadow radius b">
                <div className="pt-3">
                    <h3>25+5 Clock</h3>
                </div>
                <div className="d-flex mt-2">
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
                <div className=" mt-2 text-white d-flex justify-content-center " >
                    <div className="bg-dark shadow session-time" >
                    <h4 className="pt-3">{pause? "Break" : "Session"}</h4>
                    <p className="display-2" style={color}>{runTime(sessiontime)}</p>
                        <button onClick={startTime} className="click btn btn-light p-2 m-1" >{addtime ? <div>stop</div> : <div>play</div>}</button>
                        <button onClick={reSet}className="click btn btn-danger p-2 m-1" >reset</button>
                        <button onClick={pauseaudio}className="click btn btn-secondary p-2 m-1" >mute</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Left = ({title, changeTime,time,runTime})=>{
    return (
            <div className="m-4 text-center">
                <h4>{title}</h4>
                <button onClick={()=> changeTime(-60, time )} className="btn btn-dark p-1 m-1"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                <span className="p-2 font">{runTime(time)}</span>
                <button onClick={()=> changeTime(+60, time)} className="btn btn-dark p-1 m-1"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
            </div>
    )
}
const Right = ({title, changeTime,time,runTime})=>{
    return (
            <div className="m-4 text-center">
                <h4>{title}</h4>
                <button onClick={()=> changeTime(-60, time )} className="btn btn-dark p-1"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                <span className="p-2 font">{runTime(time)}</span>
                <button onClick={()=> changeTime(+60, time)} className="btn btn-dark p-1"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
            </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))