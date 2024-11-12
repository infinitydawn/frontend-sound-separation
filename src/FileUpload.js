import React, { useState } from 'react';
import './FileUpload.css';

function FileUpload({ onSelectFile, onUpdateData, onFileID }) {
  let fetchLink = process.env.REACT_APP_API_URL;

  // states for file transfer to server
  const [selectedFile, setSelectedFile] = useState(null);
  const [requestStatus, setReqStatus] = useState('');

  // Parameters for the filter
  const [sampleRate, setSampleRate] = useState(22050);
  const [windowSize, setWinSize] = useState(1024);
  const [hopLength, setHopLength] = useState(512);

  // handlers for states changes
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // parameter change handlers
  const handleSampleRateChange = (event) => {
    setSampleRate(event.target.value);
  };
  const handleWindowSizeChange = (event) => {
    setWinSize(event.target.value);
  };
  const handleHopLengthChange = (event) => {
    setHopLength(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReqStatus("Uploading...")

    if (selectedFile) {
      console.log(selectedFile)
      if (selectedFile.type === "audio/wav") {
        onSelectFile(selectedFile);
        const formData = new FormData();
        const params = JSON.stringify({
          sampleRate: sampleRate,
          windowSize: windowSize,
          hopLength: hopLength
        })

        alert(params)

        formData.append('file', selectedFile);
        formData.append('params', params);
         

        fetch(`${fetchLink}/upload`, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            console.log("file id");
            console.log(data);
            onFileID(data.fileId);
            setReqStatus("Uploaded Successfully!")
            //alert(data.message);

            // pass data to chart
            if (onUpdateData) {
              let samplesArray = data.message.split(",")
              samplesArray[0] = samplesArray[0].substring(1, samplesArray[0].length)
              let last = samplesArray.length - 1
              samplesArray[samplesArray.length - 1] = samplesArray[samplesArray.length - 1].substring(0, samplesArray[last].length - 2)


              samplesArray = samplesArray.map(sample => parseInt(sample));
              console.log(samplesArray)

              onUpdateData(samplesArray);  // Update the chart data with the result
            }
          })
          .catch(error => {
            console.error('Error:', error);
            setReqStatus(error)
          });
      } else {
        setReqStatus("Wrong file type. Please select a WAV file, and try to upload it again.")
      }
    } else {
      setReqStatus("File upload field is empty, please select a WAV file.")
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <h3>{requestStatus}</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <div>

          <label htmlFor='sample-rate'>Sampling Rate (22050 if default)</label>
          <input id='sample-rate' type="number" onChange={handleSampleRateChange} placeholder='Set sampling rate' value={ sampleRate }/>
          
          <label htmlFor='window-size'>Window/Frame Size</label>
          <input id='window-size' type="number" onChange={handleWindowSizeChange} placeholder='Set window/frame size' value={ windowSize }/>

          <label htmlFor='hop-length'>Hop/Stride Length</label>
          <input id='hop-length' type="number" onChange={handleHopLengthChange} placeholder='Set hop/stride length' value={ hopLength }/>

        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
