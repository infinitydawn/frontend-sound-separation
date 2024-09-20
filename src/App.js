import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import GetUpdateButton from './GetUpdateButton';
import GetUploads from './GetUploads';
import LineChart from './LineChart';

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
      <GetUpdateButton onUpdateData={handleUpdateData} />  {/* Pass the function */}
      <GetUploads />
      <LineChart chartData={chartData} />  {/* Pass chart data as props */}
    </div>
  );
}

export default App;
