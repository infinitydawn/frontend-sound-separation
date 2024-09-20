import React, { useState } from 'react';
import './LoadAudio.css';

function LoadAudio({ onUpdateData }) {
    const [fileStatus, setFileStatus] = useState("Unknown");
    const [audioIndex, setAudioIndex] = useState(0);

    let fetchLink = process.env.REACT_APP_API_URL;

    const handleNumChange = (event) => {
        setAudioIndex(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        setFileStatus("Waiting for response from server...");
        fetch(`${fetchLink}/load-track?audioIndex=${audioIndex}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.message);
                setFileStatus(data.message);

                // Sending the data to the chart
                if (onUpdateData) {
        
                    let samplesArray = data.message.split(",");

                    samplesArray = samplesArray.map(sample => parseInt(sample.trim()));
                    onUpdateData(samplesArray); 
                }
            })
            .catch(err => {
                console.log(err);
                setFileStatus("Error fetching data");
            });
    };

    return (
        <div>
            <form>
                <input onChange={handleNumChange} type="number" placeholder="type index of audio"></input>
                <label>Selected Index: {audioIndex}</label>
                <button onClick={handleClick}>
                    Load Data To Chart
                </button>
            </form>
            <h2>

            </h2>
        </div>
    );
}

export default LoadAudio;
