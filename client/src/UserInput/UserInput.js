import React from 'react'
import { useState, useEffect } from "react";
import "./UserInput.css";
import Axios from "axios";

const UserInput = (prop) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFileSubmit, setIsFileSubmit] = useState(false);
    const [fileContent, setFileContent] = useState();
    const [snappedGeopoints, setSnappedGeopoints] = useState();
    const [rawGeopoints, setRawGeopoints] = useState("");

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

    // const getData = async () => {
    //     const { data } = await Axios.get("http://localhost:8080/getRawGeopoints");
    //     setRawGeopoints(data)
    // };

    useEffect(() => {
        // getData();
        Axios.get("http://localhost:8080/getRawGeopoints").then((response) => {
            setRawGeopoints(response.data)
        });
    }, [isFileSubmit]);

    const handleSubmission = () => {
        prop.onSetRawJson(fileContent)
        const postData = fileContent[Object.keys(fileContent)[0]]

        for (let i = 0; i < postData.length; i++) {
            Axios.post("http://localhost:8080/createRawGeopoints", {
                time: postData[i].time,
                lat: postData[i].lat,
                lng: postData[i].lng
            }).then((response) => {
                setIsFileSubmit(true);
            });
        }
    };

    const handleMapMatch = async () => {
        var path = ""
        const googleurl = "https://roads.googleapis.com/v1/snapToRoads?path="
        const interpolate = "&interpolate=true&key="
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
        for (let i = 0; i < rawGeopoints.length; i++) {
            // console.log(rawGeopoints[i].time)
            // console.log(rawGeopoints[i].lat)
            // console.log(rawGeopoints[i].lng)
            path += String(rawGeopoints[i].lat) + "," + String(rawGeopoints[i].lng) + "|"
        }
        // console.log(path)
        var url = googleurl + path.slice(0, -1) + interpolate + googleMapsApiKey

        var axios = require('axios');

        var config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                // console.log(response.data[Object.keys(response.data)[0]])
                const snappedPoints = response.data[Object.keys(response.data)[0]]
                for (let i = 0; i < snappedPoints.length; i++) {
                    Axios.post("http://localhost:8080/createSnappedGeopoints", {
                        lat: snappedPoints[i].location.latitude,
                        lng: snappedPoints[i].location.longitude,
                    }).then((response) => {
                        // console.log(response.data);
                    });
                }
                getSnappedData();
            })
            .catch(function (error) {
                console.log(error);
            });

        // await Axios.get("http://localhost:8080/getSnappedGeopoints").then((response) => {
        //     setSnappedGeopoints(response.data)
        // });

        console.log("checking snapped geopoints", snappedGeopoints)
        // prop.OnSetSnappedGeopoints(snappedGeopoints)

        // setIsSnapped(true);
        // console.log(snappedGeopoints)


    };

    const getSnappedData = async () => {
        // const { data } = await Axios.get("http://localhost:8080/getSnappedGeopoints");
        await Axios.get("http://localhost:8080/getSnappedGeopoints").then((response) => {
            setSnappedGeopoints(response.data);
            prop.OnSetSnappedGeopoints(response.data)
        });

        console.log("here", snappedGeopoints)


        // console.log("here", snappedGeopoints)
    };

    // useEffect(() => {
    //     getSnappedData();
    //     console.log("here 2", snappedGeopoints)
    //     prop.OnSetSnappedGeopoints(snappedGeopoints)
    // }, [isSnapped]);

    const handleClear = () => {
        // setSelectedFile();
        // setIsFilePicked(false);
        // setIsFileSubmit(false);
        // fileInputHandler(null);
        // prop.onSetRawJson(null);

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
                <button onClick={handleMapMatch}>Map Match!</button>
            </div>
        </div>
    )
}

export default UserInput
