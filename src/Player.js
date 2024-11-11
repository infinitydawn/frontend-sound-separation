import React, { useState, useRef } from 'react';
import Waveform from './Waveform';

const Player = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const waveformRef = useRef(null);

    const togglePlayPause = () => {
        if (waveformRef.current) {
            waveformRef.current.playPause();
            setIsPlaying((prev) => !prev);
        }
    };

    const formatTime = (seconds) =>
        [seconds / 60, seconds % 60]
            .map((v) => `0${Math.floor(v)}`.slice(-2))
            .join(':');

    return (
        <div>
            <h2>Audio Player</h2>
            <Waveform
                audioUrl={audioUrl}
                updateTime={setCurrentTime}
                ref={waveformRef}
            />
            <p>Current time: {formatTime(currentTime)}</p>
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Player;
