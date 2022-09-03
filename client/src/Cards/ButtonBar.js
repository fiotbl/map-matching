import React from 'react'
import { Button, Box } from "@material-ui/core";
import "./ButtonBar.css";

const ButtonBar = (props) => {
    const handleSubmit = () => {
        props.onSetSendDataToMap(true)
    }

    return (
        <div className="ButtonBar">
            <Box display="flex" justifyContent="space-between">
                <Button id="submitBtn" variant="contained" style={{
                    backgroundColor: "#55828bff",
                }} component="span" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="contained" style={{
                    backgroundColor: "#55828bff",
                }} component="span">
                    Map Match!
                </Button>
            </Box>
        </div>

    )
}

export default ButtonBar
