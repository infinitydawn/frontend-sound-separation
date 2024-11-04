import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import GetUploads from './GetUploads';
import LineChart from './LineChart';
import LoadAudio from './LoadAudio';
import logo from './assets/mascot.png'; // Import your image

function App() {
  const [chartData, setChartData] = useState([]); 

  // Function to update the chart data (from GetUpdateButton)
  const handleUpdateData = (data) => {
    setChartData(data);
  };

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="corner-image" /> {/* Add the image element here */}
      <h1>Percussion Remover App</h1>

      <div className="section file-upload-section">
        <FileUpload onUpdateData={handleUpdateData} />
      </div>
      <div className="section get-uploads-section">
        <h2>Available Uploads</h2>
        <GetUploads />
      </div>

      <div className="section load-audio-section">
        <h2>Select and Load Audio</h2>
        <LoadAudio onUpdateData={handleUpdateData} />
      </div>

      

      <div className="section chart-section">
        <h2>Audio Data Chart</h2>
        <LineChart chartData={chartData} /> 
      </div>
      
    </div>
  );
}

export default App;
