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

    const getRawDataHelper = async () => {
        const rawDataFetched = await getRawData();
        console.log("Raw data fetched", rawDataFetched)
        setRawData(rawDataFetched);
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
                {rawData != ""
                    ? <ul>
                        {rawData.map((data) =>
                        (<GeopointDataItem
                            key={data.id} // key is a prop that can be added to ANY component (custom or built in)
                            date={data.time}
                            lat={data.lat}
                            lng={data.lng}
                        />))}
                    </ul>
                    : <p>No data uploaded!</p>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    )
}

export default DataOutput
