import React from 'react'
import { useState, useEffect } from "react";
import "./UserInput.css";
import Axios from "axios";

const UserInput = (prop) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFileSubmit, setIsFileSubmit] = useState(false);
    const [fileContent, setFileContent] = useState();
    const [snappedGeopoints, setSnappedGeopoints] = useState("");

    const fileInputHandler = (file) => {
        setSelectedFile(file);
        setIsFilePicked(true);
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    };

    const handleFile = (e) => {
        const content = e.target.result;
        setFileContent(JSON.parse(content));
    }

    const handleSubmission = () => {
        setIsFileSubmit(true);
        prop.onSetRawJson(fileContent)
        const postData = fileContent[Object.keys(fileContent)[0]]

        for (let i = 0; i < postData.length; i++) {
            Axios.post("http://localhost:8080/createRawGeopoints", {
                time: postData[i].time,
                lat: postData[i].lat,
                lng: postData[i].lng
            }).then((response) => {
                // alert("Added raw geopoints")
            });
        }

        // insert get req - gets data from db, run calulcation and save into new snapped geopoints model
    };


    const handleClear = () => {
        // setSelectedFile();
        // setIsFilePicked(false);
        setIsFileSubmit(false);
    };

    useEffect(() => {
        // fetch("/result", {
        //     method: "POST",
        //     cache: "no-cache",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json, text/plain, */*',
        //     },
        //     body: JSON.stringify(fileContent)
        // }).then(() => {
        //     console.log("Posted")
        // })

        // fetch('/result').then(
        //     response => {
        //         console.log(response.text())
        //         // response.text()
        //     }

        // )
        // .then((responseData) => {
        //     console.log("responseData", responseData)

        //     setSnappedGeopoints(responseData)
        //     console.log(snappedGeopoints)
        //     console.log("Ran")
        //     prop.OnSetSnappedGeopoints(snappedGeopoints)
        // })
        //     .catch(error => console.warn(error));
    }, [isFileSubmit])


    return (
        <div className="mainInput">
            <div className="fileInputDiv" >
                Upload JSON file
                <input type="file" className="fileInput" onChange={e =>
                    fileInputHandler(e.target.files[0])} />
            </div>

            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    )
}

export default UserInput
