import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        // Initialize WaveSurfer instance
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'rgb(75, 192, 192)',
            progressColor: 'rgba(75, 192, 192, 0.5)',
            cursorColor: '#333',
            barWidth: 2,
            responsive: true,
            height: 100,
        });

        // Load the audio file
        if (audioUrl) {
            wavesurfer.current.load(audioUrl);
        }

        return () => {
            // Clean up wavesurfer instance on component unmount
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, [audioUrl]);

    return <div ref={waveformRef} />;
};

export default Waveform;
