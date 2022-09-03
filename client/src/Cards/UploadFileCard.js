import React from 'react'
import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";


const UploadFileCard = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [fileContent, setFileContent] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);


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

    const testData = (e) => {
        console.log(fileContent)
    }

    return (
        <div>
            <Card style={{ width: 400, backgroundColor: "#c9e4caff" }}>
                <CardContent>Upload GPS Data (JSON Format):
                    {isFilePicked ? (
                        <div>
                            <p>File Name: {selectedFile.name}</p>
                            {/* <p>Filetype: {selectedFile.type}</p> */}
                            <p>File Size (bytes): {selectedFile.size}</p>
                            <p>
                                File Last Modified Date:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}

                </CardContent>
                <CardActions>
                    <input
                        type="file"
                        accept="application/JSON"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        onChange={e =>
                            fileInputHandler(e.target.files[0])}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload
                        </Button>
                    </label>
                    <button onClick={testData}>Submit</button>

                </CardActions>
            </Card>
        </div>
    )
}

export default UploadFileCard
