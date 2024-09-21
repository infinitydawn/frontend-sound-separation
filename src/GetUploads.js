import React, { useState } from 'react';
import './GetUploads.css'


function GetUploads() {
    const [uploadsList, setUploadsList] = useState([0, "Unknown"])

    let fetchLink = process.env.REACT_APP_API_URL;

    const handleClick = (event) => {
        event.preventDefault();
        fetch(`${fetchLink}/see-uploads`, {
            method: "GET"
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.message)
                setUploadsList(data.message);
            })
    }

    return (
        <div>
            <button onClick={handleClick}>
                See Uploads
            </button>

            <h2>
                {uploadsList.length > 0
                    ? uploadsList.map((item, index) => (
                        <div className="upload-item" key={index}>#{index} - {item}</div>
                    ))
                    : 'No uploads to display'}
            </h2>
        </div>
    );

}

export default GetUploads;