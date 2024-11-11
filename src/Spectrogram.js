import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

const SpectrogramComponent = ({ audioUrl }) => {
    const [waveSurfer, setWaveSurfer] = useState(null); // Store WaveSurfer instance in state
    const [spectrogramContainer, setSpectrogramContainer] = useState(null); // DOM node for spectrogram

    useEffect(() => {
        if (!spectrogramContainer) return; // Ensure container is ready

        // Initialize WaveSurfer
        const ws = WaveSurfer.create({
            container: spectrogramContainer,
            height: 0, // Prevent waveform rendering
            waveColor: 'transparent',
            progressColor: 'transparent',
        });

        // Register the Spectrogram plugin
        ws.registerPlugin(
            SpectrogramPlugin.create({
                container: spectrogramContainer, // Use the container
                labels: true,
                height: 200,
            })
        );

        // Load the audio file
        if (audioUrl) {
            ws.load(audioUrl);
        }

        // Save WaveSurfer instance to state
        setWaveSurfer(ws);

        // Cleanup on unmount
        return () => {
            ws.destroy();
        };
    }, [spectrogramContainer, audioUrl]); // Re-run if container or audioUrl changes

    return (
        <div>
            {/* Set the spectrogram container */}
            <div
                ref={(node) => setSpectrogramContainer(node)}
                style={{
                    height: 'auto',
                    backgroundColor: '#333',
                }}
            />
        </div>
    );
};

export default SpectrogramComponent;
