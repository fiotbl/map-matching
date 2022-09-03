import React from 'react'
import { Card, CardContent, CardActions, Button } from "@material-ui/core";

const FileInformation = (props) => {
    return (
        <Card style={{ width: 400, backgroundColor: "#c9e4caff", marginBottom: 20 }}>
            <CardContent>
                {props.isFilePicked ? (
                    <div>
                        <p>File Name: {props.selectedFile.name}</p>
                        <p>File Size (bytes): {props.selectedFile.size}</p>
                        <p>
                            File Last Modified Date:{' '}
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
