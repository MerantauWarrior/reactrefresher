import React, {useEffect, useRef, useState} from 'react'
import Controls from "./components/Controls";
import List from "./components/List";
import './index.css'

const data = [
  '/songs/1.mp3',
  '/songs/2.mp3'
]

function App() {
  const [isPlaying, setIsPlaying] = useState('stop');
  const [tracks, setTracks] = useState([])
  const [trackNow, setTrackNow] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const audRef = useRef(null)

  useEffect(() => {
    setTracks(data)
  }, [])
  useEffect(() => {
    if (isPlaying === 'play') {
      audRef.current.play();
    } else if (isPlaying === 'pause') {
      audRef.current.pause();
    } else if (isPlaying === 'stop') {
      audRef.current.pause()
      audRef.current.currentTime = 0
    } else {
      return false;
    }
  }, [isPlaying, trackNow]);

  const onOffSong = (val) => {
    setIsPlaying(val)
  }
  const changeTrack = (num) => {
    setTrackNow(num)
    setIsPlaying('play')
  }
  const nextSong = () => {
    setTrackNow(prev => prev + 1)
    setIsPlaying('play')
  }
  const prevSong = () => {
    setTrackNow(prev => prev - 1)
    setIsPlaying('play')
  }
  const prevFow = () => {
    audRef.current.currentTime -= 15
  }
  const nextFow = () => {
    audRef.current.currentTime += 15
  }
  const loadMeta = () => {
    const dur = audRef.current.duration
    setDuration(dur)
  }
  const update = () => {
    const p = audRef.current.currentTime
    setProgress(p)
  }

  return (
    <>
      <List songs={tracks} song={changeTrack}/>
      <Controls next={nextSong} prev={prevSong} playPause={onOffSong} isPlaying={isPlaying} prevFow={prevFow}
                nextFow={nextFow} audRef={audRef} duration={duration} progress={progress} />
      <audio ref={audRef} src={tracks[trackNow]} onEnded={nextSong} onLoadedMetadata={loadMeta} onTimeUpdate={update}/>
    </>
  )
}

export default App
