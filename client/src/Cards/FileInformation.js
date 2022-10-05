import React from 'react'
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const FileInformation = (props) => {
    return (
        <Card style={{ width: 430, backgroundColor: "#c9e4caff", marginBottom: 20 }}>
            <CardContent>
                {props.isFilePicked ? (
                    <div>
                        <p><b>File Name:</b> {props.selectedFile.name}</p>
                        <p><b>File Size </b>(bytes): {props.selectedFile.size}</p>
                        <p>
                            <b>File Last Modified Date:</b>{' '}
                            {props.selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </CardContent>
        </Card>
    )
}

export default FileInformation
