import React from 'react'
import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import Axios from "axios";


const UploadFileCard = (props) => {
    const [fileContent, setFileContent] = useState();

    useEffect(() => {
        props.onSetRawJsonHandler(fileContent);

        let deleteData = async () => {
            await Axios.delete("http://localhost:8080/deleteRawGeopoints").then((response) => {
                console.log("Deleted All")
            });
        }

        deleteData();

        if (fileContent != null) {
            const postData = fileContent[Object.keys(fileContent)[0]]
            for (let i = 0; i < postData.length; i++) {
                Axios.post("http://localhost:8080/createRawGeopoints", {
                    time: postData[i].time,
                    lat: postData[i].lat,
                    lng: postData[i].lng
                }).then((response) => {
                    // setIsFileSubmit(true);
                    console.log("Posted")
                });
            }
        }
    }, [props.sendDataToMap]);

    const fileInputHandler = (file) => {
        props.onSetSelectedFile(file);
        props.onSetIsFilePicked(true);
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
    };

    const handleFile = (e) => {
        const content = e.target.result;
        setFileContent(JSON.parse(content));
        props.onSetFileContent(JSON.parse(content))
    }

    const testData = (e) => {
        console.log(fileContent)
    }

    return (
        <div>
            <Card style={{ width: 400, backgroundColor: "#c9e4caff", marginBottom: 20 }}>
                <CardContent>Upload GPS Data (JSON Format):
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
                        <Button variant="contained" style={{
                            backgroundColor: "#0000000",
                        }} component="span">
                            Upload
                        </Button>
                    </label>
                </CardActions>
            </Card>
        </div>
    )
}

export default UploadFileCard
