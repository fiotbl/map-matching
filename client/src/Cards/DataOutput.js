import React from 'react'
import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FileSaver from "file-saver";
import Button from "@mui/material/Button";

import { getSnappedData } from "../Functions/getSnappedData";
import { getOSRMSnappedData } from "../Functions/getOSRMSnappedData";
import { getRawData } from "../Functions/getRawData";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const DataOutput = (props) => {
    const [value, setValue] = useState(0);
    const [rawData, setRawData] = useState("");
    const [snappedData, setSnappedData] = useState("");

    const downloadSnappedData = () => {
        var blob = new Blob([JSON.stringify(snappedData)], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "map-matched-data.json");
    }

    const getRawDataHelper = async () => {
        const rawDataFetched = await getRawData();
        console.log("Raw data fetched", rawDataFetched)
        setRawData(rawDataFetched);
    }

    const getSnappedDataHelper = async () => {
        if (props.algorithm == 10) {
            const snappedDataFetched = await getSnappedData();
            console.log("Snapped data fetched", snappedDataFetched)
            setSnappedData(snappedDataFetched);
        }
        else if (props.algorithm == 20) {
            const snappedDataFetched = await getOSRMSnappedData();
            console.log("Snapped data fetched", snappedDataFetched)
            setSnappedData(snappedDataFetched);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (props.showRawData) {
            getRawDataHelper();
            console.log(rawData);
        }
    }, [props.showRawData]);

    useEffect(() => {
        getSnappedDataHelper();
    }, [props.showSnappedData]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered variant="fullWidth">
                    <Tab label="Raw Geopoints" {...a11yProps(0)} />
                    <Tab label="Map-matched Geopoints" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {rawData != "" ?
                    <div style={{ overflow: "auto" }} >
                        <Table>
                            <TableHead>
                                <TableRow
                                    style={{
                                        backgroundColor: "rgb(111, 134, 138)",
                                        height: "30px"
                                    }}
                                >
                                    <TableCell align="center">Latitude</TableCell>
                                    <TableCell align="center">Longitude</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                        </Table>
                        <div style={{ overflow: 'auto', height: '340px' }}>
                            <Table>
                                <TableBody>
                                    {rawData.map((row, i) => {
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.lat}</TableCell>
                                                <TableCell align="center">{row.lng}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    : <p>No data uploaded!</p>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {snappedData != "" ?
                    <div style={{ overflow: "auto" }} >
                        <Table>
                            <TableHead>
                                <TableRow
                                    style={{
                                        backgroundColor: "rgb(111, 134, 138)",
                                        height: "30px"
                                    }}
                                >
                                    <TableCell align="center">Latitude</TableCell>
                                    <TableCell align="center">Longitude</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                        </Table>
                        <div style={{ overflow: 'auto', height: '300px', marginBottom: '10px' }}>
                            <Table>
                                <TableBody>
                                    {snappedData.map((row, i) => {
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.lat}</TableCell>
                                                <TableCell align="center">{row.lng}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                        </div>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" style={{
                                backgroundColor: "#55828bff",
                            }} component="span" onClick={downloadSnappedData}>
                                Download Map-Matched Data
                            </Button>
                        </Box>

                    </div>
                    : <p>No map-matched data yet!</p>
                }
            </TabPanel>
        </Box>
    )
}

export default DataOutput
