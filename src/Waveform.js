import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

const Waveform = ({ audioUrl }) => {
    const containerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [url, setUrl] = useState(audioUrl);

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        height: 100,
        waveColor: 'rgb(75, 192, 192)',
        progressColor: 'rgba(75, 192, 192, 0.5)',
        cursorColor: '#333',
        plugins: useMemo(() => [Timeline.create()], []),
    });

    // Load audio file when the URL changes
    useEffect(() => {
        if (wavesurfer && url) {
            console.log(`Loading audio from URL: ${url}`);
            wavesurfer.load(url);
            wavesurfer.on('ready', () => console.log('Audio is ready'));
            wavesurfer.on('audioprocess', () => setCurrentTime(wavesurfer.getCurrentTime()));
            wavesurfer.on('play', () => setIsPlaying(true));
            wavesurfer.on('pause', () => setIsPlaying(false));
        }
        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
    }, [url, wavesurfer]);

    const onPlayPause = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.playPause();
        }
    }, [wavesurfer]);

    const formatTime = (seconds) =>
        [seconds / 60, seconds % 60]
            .map((v) => `0${Math.floor(v)}`.slice(-2))
            .join(':');

    return (
        <>
            <div ref={containerRef} />
            <p>Current time: {formatTime(currentTime)}</p>
            <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
                <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                {/* Download Button */}
                <a
                    href={audioUrl}
                    download="audio-file.wav"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: "#007bff",
                        padding: '0.5em 1em',
                        borderRadius: '5px',
                        textAlign: 'center',
                    }}
                >
                    Download
                </a>
            </div>
        </>
    );
};

export default Waveform;
