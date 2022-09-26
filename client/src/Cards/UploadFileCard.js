import React from 'react'
import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import Axios from "axios";


const UploadFileCard = (props) => {
    const [fileContent, setFileContent] = useState();

    const deleteData = async () => {
        await Axios.delete("http://localhost:8080/deleteRawGeopoints").then((response) => {
            console.log("Deleted All")
        });
    }

    const postData = async (data) => {
        await deleteData();
        console.log(data);

        await Axios.post("http://localhost:8080/createRawGeopoints", data).then((response) => {
            console.log("Posted")
            props.onSetShowRawData(true)
        });
        // for (let i = 0; i < data.length; i++) {
        //     await Axios.post("http://localhost:8080/createRawGeopoints", {
        //         time: data[i].time,
        //         lat: data[i].lat,
        //         lng: data[i].lng
        //     }).then((response) => {
        //         // setIsFileSubmit(true);
        //         console.log("Posted")
        //     });
        // }
    }

    useEffect(() => {
        props.onSetRawJsonHandler(fileContent);
        if (fileContent != null) {
            const dataToPost = fileContent[Object.keys(fileContent)[0]]
            postData(dataToPost);

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
