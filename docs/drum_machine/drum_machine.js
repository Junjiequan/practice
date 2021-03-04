const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: 'Guitar-short',
      src: './clip/clip1.wav'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Guitar-short-2',
      src: './clip/clip2.wav'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Probably-Bass',
      url: './clip/clip3.wav'
    }
  ];

const App = () =>{
  
    return (
    <div className="min-vh-100 text-white d-flex align-items-center justify-content-center">
        <div className="text-center col-7 bg-secondary">
            <h2 className="text-white">HIT THE BUTTON</h2>
            {audioClips.map((clip)=> (
             <Pad key={clip.id} clip={clip}/>  ))}
             {/* 
             //  (clip) = audioClips -> [ 0,1,2,3,4]  -> 
             // [0] = {keyCode: 67,keyTrigger : 'C', id : 'handsome', url: ''
             // so if we call {clip.id} then it calls 'handsome'
             // likewise, clip = {clip} calls the entire value of an array [0]  = {keyCode, keyTrigger, etc.,} 
             */}
               
        </div>
    </div> 
    )
}
const Pad= ({clip})=>{

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
        audio.currentTime = 0;
        audio.play();
    };
    return(
        <div onClick = {playit} className={`btn btn-warning p-4 m-2 ${active && "btn-danger"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url || clip.src} />
            {clip.keyTrigger}
        </div>
    );
}
ReactDOM.render(<App/>, document.getElementById('app'));