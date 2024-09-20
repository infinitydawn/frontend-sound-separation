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
      <FileUpload onUpdateData={handleUpdateData} />
      <LoadAudio onUpdateData={handleUpdateData} />  {/* Pass the function */}
      <GetUploads />
      <LineChart chartData={chartData} />  {/* Pass chart data as props */}
    </div>
  );
}

export default App;
