const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      keyName: '钢琴Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      keyName: '钢琴W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      keyName: '钢琴E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      keyName: '拍奏A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      keyName: '架鼓S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      keyName: '拍奏D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      keyName: '吉他Z',
      id: 'Guitar-short',
      src: './clip/clip1.wav'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      keyName: '吉他X',
      id: 'Guitar-short-2',
      src: './clip/clip2.wav'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      keyName: '吉他C',
      id: 'Probably-Bass',
      url: './clip/clip3.wav'
    }
  ];

const App = () =>{
    const [volume, setVolume] = React.useState(0.7);
    const [record, setRecord] = React.useState("录制:");
    const [speed, setSpeed] = React.useState(0.5);
    const playRecord = () =>{
      let index = 0;
      let recordArray = record.split(" ");
      const interval = setInterval(()=>{ 
          const audio = document.getElementById(recordArray[index + 1]);
          audio.volume = volume;
          audio.currtTime = 0;
          audio.play();
          index++;
      } , speed * 800);
      setTimeout(() => clearInterval(interval), 800 * speed * recordArray.length - 1)
      
    };
    return (
      <>
    <div className="min-vh-100 text-white d-flex align-items-center justify-content-center">
        <div className="text-center col-7 bg-danger rounded-2 container-height">
            <h2 className="black text-white pt-2 pb-2  rounded-top rounded-5 ">BEATS</h2>
             {audioClips.map((clip)=> (
             <Pad key={clip.id} clip={clip} volume={volume} setRecord={setRecord}/>  ))}
             {/* 
             //  (clip) = audioClips -> [ 0,1,2,3,4]  -> 
             // [0] = {keyCode: 67,keyTrigger : 'C', id : 'handsome', url: ''
             // so if we call {clip.id} then it calls 'handsome'
             // likewise, clip = {clip} calls the entire value of an array [0]  = {keyCode, keyTrigger, etc.,} 
             */}
              <br/>
              <h4>音量控制</h4>
              <input step="0.01" max="1" min="0" className="w-75" title={volume} 
              value={volume} onChange={e=> setVolume(e.target.value)} type="range" 
              />
              <h3>{record}</h3>
             
                <>
                <button onClick={playRecord} className="btn btn-dark m-2 ">播放</button>
                <button onClick={()=> setRecord("录制:")}className="btn btn-secondary m-2 ">清除</button>
                <br/>
              <h3>播放速度调节器<span className="h6">(往左加速)</span></h3>
                <input step="0.01" max="1.5" min="0.1" className="w-75" title={speed} 
              value={speed} onChange={e=> setSpeed(e.target.value)} type="range" 
              />
                </>
              

              

        </div>
    </div> 
    </> )
   
}
const Pad= ({clip,volume,setRecord})=>{

    /* ===== this part is a bit hard to digest*/
    const [active, setActive] = React.useState(false);

    React.useEffect(()=>{
        document.addEventListener('keydown', handleKeyPress);
            return () =>{
                document.removeEventListener('keydown', handleKeyPress);
            }
    });
    const handleKeyPress = (e) =>{
        if(e.keyCode === clip.keyCode){
            playit();
        }
    }
    /* /===== this part is a bit hard to digest*/

    const playit = () =>{
        let audio = document.getElementById(clip.keyTrigger);
        setActive({
            active:true
        });
        setTimeout(()=> setActive(false), 250);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();
        setRecord((prev) => prev + " " +clip.keyTrigger);
    };
    return(
        <div onClick = {playit} className={`btn btn-warning p-3 m-2 ${active && "btn-light"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url || clip.src} />
            {clip.keyName}
        </div>
    );
}
ReactDOM.render(<App/>, document.body);