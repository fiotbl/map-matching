import React from 'react'
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const ButtonBar = () => {
    return (
        <div>
            <Button variant="contained" style={{
                backgroundColor: "#55828bff",
            }} component="span">
                Submit
            </Button>
            <Button variant="contained" style={{
                backgroundColor: "#55828bff",
            }} component="span">
                Map Match!
            </Button>
        </div>
    )
}

export default ButtonBar
