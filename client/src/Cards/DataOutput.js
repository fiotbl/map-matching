import React from 'react'
import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getSnappedData } from "../Functions/getSnappedData";
import { getRawData } from "../Functions/getRawData";
import GeopointDataItem from "./GeopointDataItem";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

    const getRawDataHelper = async () => {
        const rawDataFetched = await getRawData();
        console.log("Raw data fetched", rawDataFetched)
        setRawData(rawDataFetched);
    }

    const getSnappedDataHelper = async () => {
        const snappedDataFetched = await getSnappedData();
        console.log("Snapped data fetched", snappedDataFetched)
        setSnappedData(snappedDataFetched);
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
        if (props.showSnappedData) {
            getSnappedDataHelper();
        }
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
                {/* {JSON.stringify(rawData)}
                 */}
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
                        <div style={{ overflow: 'auto', height: '340px' }}>
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
                    </div>
                    : <p>No data uploaded!</p>
                }
            </TabPanel>
        </Box>
    )
}

export default DataOutput
