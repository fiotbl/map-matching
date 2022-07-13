import React from 'react'
import { useState, useEffect } from "react";
import "./UserInput.css";

const UserInput = (prop) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [fileContent, setFileContent] = useState();
    const [snappedGeopoints, setSnappedGeopoints] = useState("");

    let fileReader;

    const fileInputHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };


    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFileContent(JSON.parse(content));
    }

    const handleSubmission = () => {
        console.log(selectedFile)
        try {
            fileReader = new FileReader()
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(selectedFile)
            console.log(fileContent)
        } catch (error) {
            console.log(error)
        }
        prop.onSetRawJson(fileContent)

    };

    const handleClear = () => {
        setSelectedFile();
        setIsFilePicked(false);
    };

    useEffect(() => {
        fetch("/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileContent)
        }
        ).then((response) => response.text()
        ).then((responseData) => {
            setSnappedGeopoints(responseData)
            console.log(snappedGeopoints)
        })
            .catch(error => console.warn(error));
    }, [fileContent])


    return (
        <div className="mainInput">
            <div className="fileInputDiv" >
                Upload JSON file
                <input type="file" className="fileInput" onChange={fileInputHandler} />
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
