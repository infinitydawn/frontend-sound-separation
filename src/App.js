import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import GetUploads from './GetUploads';
import LineChart from './LineChart';
import LoadAudio from './LoadAudio';

function App() {
  const [chartData, setChartData] = useState([]);  // New state for chart data

  // Function to update the chart data (from GetUpdateButton)
  const handleUpdateData = (data) => {
    setChartData(data);
  };

  return (
    <div className="App">
      <h1>Percussion Remover App</h1>

      {/* Container for the File Upload Section */}
      <div className="section file-upload-section">
        <FileUpload onUpdateData={handleUpdateData} />
      </div>
      {/* Container for Get Uploads Section */}
      <div className="section get-uploads-section">
        <h2>Available Uploads</h2>
        <GetUploads />
      </div>

      {/* Container for the Load Audio Section */}
      <div className="section load-audio-section">
        <h2>Select and Load Audio</h2>
        <LoadAudio onUpdateData={handleUpdateData} />
      </div>

      

      {/* Container for Line Chart Section */}
      <div className="section chart-section">
        <h2>Audio Data Chart</h2>
        <LineChart chartData={chartData} />  {/* Pass chart data as props */}
      </div>
      
    </div>
  );
}

export default App;
