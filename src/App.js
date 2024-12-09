import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import Waveform from './Waveform';
import Spectrogram from './Spectrogram';
import logo from './assets/mascot.png';

function App() {
  const [chartData, setChartData] = useState([]);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null); // State for the selected audio file
  const [currentFileID, setFileID] = useState(""); // State for file ID
  const [harmonicFileUrl, setHarmonicFileUrl] = useState(null); // State for harmonic audio file URL
  const [percussiveFileUrl, setPercussiveFileUrl] = useState(null); // State for percussive audio file URL
  const [requestStatus, setRequestStatus] = useState('');
  
  const fetchLink = process.env.REACT_APP_API_URL;

  const handleUpdateData = (data) => {
    setChartData(data); // Update chart data
    console.log("Chart data updated:", data);
  };

  const handleFileSelect = (file) => {
    const fileUrl = URL.createObjectURL(file); // Convert file to a URL
    setSelectedAudioFile(fileUrl); // Save the file URL
  };

  const handleFileID = (fileID) => {
    setFileID(fileID); // Save the file ID
    console.log("File ID received:", fileID);
  };

  // Fetch harmonic and percussive components when fileID changes
  useEffect(() => {
    if (!currentFileID) return;

    // Fetch harmonic audio
    fetch(`${fetchLink}/get-harmonic?fileId=${currentFileID}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob); // Convert blob to URL
        setHarmonicFileUrl(url); // Update state
      })
      .catch((error) => console.error("Error fetching harmonic audio:", error));

    // Fetch percussive audio
    fetch(`${fetchLink}/get-percussive?fileId=${currentFileID}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob); // Convert blob to URL
        setPercussiveFileUrl(url); // Update state
      })
      .catch((error) => console.error("Error fetching percussive audio:", error));
  }, [currentFileID, fetchLink]);

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="corner-image" />
      <h1>Clean Wave</h1>

      {/* File Upload Section */}
      <div className="section file-upload-section">
        <FileUpload
          onUpdateData={handleUpdateData}
          onSelectFile={handleFileSelect}
          onFileID={handleFileID}
          setRequestStatus={setRequestStatus}
        />
        <h3 className={requestStatus==="Uploading..." ? 'blinking-text' : ''}>{requestStatus}</h3>
      </div>

      {/* Waveform and Spectrogram for Selected File */}
      {selectedAudioFile && (
        <div className="section">
          <h2>Selected File</h2>
          <Waveform audioUrl={selectedAudioFile} />
          <Spectrogram audioUrl={selectedAudioFile} />
        </div>
      )}

      {/* Harmonic Component */}
      {requestStatus !== "Uploading..." && harmonicFileUrl && (
        <div className="section">
          <h2>Harmonic Component</h2>
          <Waveform audioUrl={harmonicFileUrl} />
          <Spectrogram audioUrl={harmonicFileUrl} />
        </div>
      )}

      {/* Percussive Component */}
      {requestStatus !== "Uploading..." && percussiveFileUrl && (
        <div className="section">
          <h2>Percussive Component</h2>
          <Waveform audioUrl={percussiveFileUrl} />
          <Spectrogram audioUrl={percussiveFileUrl} />
        </div>
      )}


      {requestStatus === "Uploading..." && (
        <h2>Waiting...</h2>
      )}
    </div>
  );
}

export default App;
