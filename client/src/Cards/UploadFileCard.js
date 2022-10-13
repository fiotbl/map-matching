import React from 'react'
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardActions, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios";
import './UploadFileCard.css'

const UploadFileCard = (props) => {

    const [algorithm, setAlgorithm] = React.useState('');

    const handleChange = (event) => {
        setAlgorithm(event.target.value);
        props.onSetAlgoritm(event.target.value)
    };

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

    return (
        <Card style={{ height: 160, width: 430, backgroundColor: "#c9e4caff", marginBottom: 10 }}>
            <Grid container>
                <Grid item xs={8}>
                    <CardContent>
                        <b>Upload GPS Data (JSON Format):</b>
                    </CardContent>
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={6}>
                    <CardContent><b>Select a Map-Matching Algorithm:</b>
                    </CardContent>
                </Grid>
                <Grid item xs={6}>
                    <CardActions>
                        <Box sx={{ minWidth: 165, minHeight: 10 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={algorithm}
                                    label="Algorithm"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Google Maps Snap to Roads</MenuItem>
                                    <MenuItem value={20}>Open Source Routing Machine</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}

export default UploadFileCard