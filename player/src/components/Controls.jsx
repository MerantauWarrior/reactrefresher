import React, {useEffect, useRef, useState} from 'react';

function Controls({playPause, next, prev, prevFow, nextFow, audRef, duration, progress}) {
  const [volume, setVolume] = useState(40);
  const progressRef = useRef(null)
  const update = (e)=>{
   audRef.current.currentTime = e.target.value;
  }
  useEffect(() => {
    if (audRef) {
      audRef.current.volume = volume / 100;
    }
  }, [volume, audRef]);
  return (
    <div>
      <div>
        <input type="range" ref={progressRef} min={0} max={duration} value={progress} onChange={(e)=>update(e)} style={{width: '100%'}} />
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{width: '100%'}}
        />
      </div>
      <br/>
      <hr/>
      <br/>
      <div>
        <button onClick={prev}>prev</button>
        <button onClick={prevFow}>-15s</button>
        <button onClick={()=>playPause('play')}>play</button>
        <button onClick={()=>playPause('pause')}>pause</button>
        <button onClick={()=>playPause('stop')}>stop</button>
        <button onClick={nextFow}>+15s</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
}

export default Controls;
