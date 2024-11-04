import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import GetUploads from './GetUploads';
import LoadAudio from './LoadAudio';
import Waveform from './Waveform';  // Import Waveform instead of LineChart

function App() {
  const [audioUrl, setAudioUrl] = useState(null);

  // Function to update the audio URL from LoadAudio component
  const handleUpdateAudioUrl = (url) => {
    setAudioUrl(url);
  };

  return (
    <div className="App">
      <h1>Percussion Remover App</h1>

      <div className="section file-upload-section">
        <FileUpload onUpdateData={handleUpdateAudioUrl} />
      </div>
      
      <div className="section get-uploads-section">
        <h2>Available Uploads</h2>
        <GetUploads />
      </div>

      <div className="section load-audio-section">
        <h2>Select and Load Audio</h2>
        <LoadAudio onUpdateData={handleUpdateAudioUrl} />
      </div>

      <div className="section waveform-section">
        <h2>Audio Waveform</h2>
        {audioUrl ? <Waveform audioUrl={audioUrl} /> : <Waveform audioUrl={'725006__audiocoffee__warm-abstraction-loop-ver'}/>}
      </div>
    </div>
  );
}

export default App;
