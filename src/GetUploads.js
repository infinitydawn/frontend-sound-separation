import React, { useState } from 'react';



function GetUploads() {
    const [fileStatus, setFileStatus] = useState("Unknown")

    let fetchLink = 'https://backend-sound-separation.onrender.com'
    // let fetchLink = 'http://localhost:5000'

    const handleClick = () => {
        fetch(`${fetchLink}/see-uploads`, {
            method: "GET"
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.message)
            setFileStatus(data.message);
        })
    }

    return (
        <div>
            <button onClick={handleClick}>
                See Uploads
            </button>
            <h2>
                {fileStatus}
            </h2>
        </div>
    );

}

export default GetUploads;