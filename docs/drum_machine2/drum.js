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

  return (
    <div className="bg-secondary min-vh-100">
        <div className="text-center">
          <h2>music player</h2>
          {audioClips.map(elem=> {
            return <Musicplayer key={elem.id} elem={elem}/>
          })}
        </div>
    </div>
  )
}

const Musicplayer = ({elem}) =>{
  
  const playit = () =>{
    const audio = document.getElementById(elem.keyTrigger);
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div onClick={playit} className="btn btn-danger p-3 m-3">
        <audio  id={elem.keyTrigger} src={elem.url} />
        {elem.keyTrigger}
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById('app'))