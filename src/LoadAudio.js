import React, { useState } from 'react';

function LoadAudio({ onUpdateData }) {
    const [fileStatus, setFileStatus] = useState("Unknown");

    let fetchLink = process.env.REACT_APP_API_URL;

    const handleClick = () => {
        setFileStatus("Waiting for response from server...");
        fetch(`${fetchLink}/load-track`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.message);
                setFileStatus(data.message);

                // Assuming the server response contains data for the chart
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
            .catch(err => {
                console.log(err);
                setFileStatus("Error fetching data");
            });
    };

    return (
        <div>
            <form>
                <input type="number" placeholder="type index of audio"></input>
                <button onClick={handleClick}>
                    Get Upload Status
                </button>
            </form>
            <h2>

            </h2>
        </div>
    );
}

export default LoadAudio;
