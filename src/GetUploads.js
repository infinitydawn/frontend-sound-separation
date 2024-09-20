import React, { useState } from 'react';



function GetUploads() {
    const [fileStatus, setFileStatus] = useState("Unknown")

    let fetchLink = process.env.REACT_APP_API_URL;

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