import React, { useState } from 'react';
import './FileUpload.css';

function FileUpload({ onSelectFile, onUpdateData, onFileID}) {
  let fetchLink = process.env.REACT_APP_API_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [requestStatus, setReqStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReqStatus("Uploading...")
    if (selectedFile) {
      console.log(selectedFile)
      if (selectedFile.type === "audio/wav") {
        onSelectFile(selectedFile);
        const formData = new FormData();
        formData.append('file', selectedFile);

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
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
