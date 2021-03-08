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
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      keyName: '吉他X',
      id: 'Guitar-short-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      keyName: '吉他C',
      id: 'Probably-Bass',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    }
  ];
  const App = () =>{
    const [volume,setVolume] = React.useState(0.7);
    const [record, setRecord] = React.useState("");
    const [speed,setSpeed] = React.useState(0.7);
      const playRecord = () =>{
        let index = 0;
        let recordShit = record.split(" ");
        const interval = setInterval(()=>{
          const audio = document.getElementById(recordShit[index])
          console.log(audio)
          audio.volume = volume;
          audio.currentTime = 0;
          audio.play();
          index++;
        }, 650 * speed);
      setTimeout(()=>clearInterval(interval), 650 * speed * recordShit.length -1 );
    }
    const handleVolume = (e) => setVolume(e.target.value);
    const handleSpeed = (e) => setSpeed(e.target.value);
    return (
      <>
        <div className="bg-dark min-vh-100 text-center text-white">
          <h2 >Check this out</h2>
          {audioClips.map((index) => {
            return <Musicplayer key={index.id} index={index} volume={volume} setRecord={setRecord}/>
          })}
          <h3>Volume</h3>
          <input type="range" onChange={handleVolume} step="0.01" value={volume} max="1" min="0.1" className="w-50"/>
          <h4>{record}</h4>
          {record && (
            <>
            <button onClick={playRecord} className="btn btn-light m-2">PLAY</button>
            <button onClick={()=> setRecord("")}className="btn btn-danger m-2">CLOSE</button>
            </>
          )}
          <h3>speed</h3>
          <input type="range" onChange={handleSpeed} step="0.01" value={speed} max="1" min="0.1" className="w-50" />
        </div>
      </>
    )
  }

  const Musicplayer = ({index,volume,setRecord})=> {
    const [active,setActive] = React.useState(false);

      React.useEffect(()=>{
        document.addEventListener('keydown', handleKeypress)
          return () => {
            document.removeEventListener('keydown', handleKeypress)
      }})
      const handleKeypress = (e) =>{
        if (e.keyCode === index.keyCode){
          playAudio();
        }
      }
    const playAudio = () =>{
      let audio = document.getElementById(index.keyTrigger);
      setActive(true);
      setTimeout(() =>  setActive(false), 300);
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      setRecord((prev)=> prev  + index.keyTrigger + " ")
    }
    return (
        <div onClick = {playAudio} className="btn btn-warning p-3 m-2 ">
          <audio id={index.keyTrigger} src={index.url} />
          {index.keyTrigger}
        </div>
    )
  }
ReactDOM.render(<App/>, document.getElementById('app'))