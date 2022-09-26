import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Map from "./Map/Map";
import UploadFileCard from "./Cards/UploadFileCard";
import FileInformation from "./Cards/FileInformation";
import ButtonBar from "./Cards/ButtonBar";
import "./App.css";
import logo from "./TitleImg.png";

// functions
import { getTest } from "./Functions/test";
import { getSnappedData } from "./Functions/getSnappedData";
import { mapMatch } from "./Functions/mapMatch";

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
          <Typography>{children}</Typography>
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


function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  // const [test, setTest] = useState("Initial Value");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [sendDataToMap, setSendDataToMap] = useState(false);
  // const [mapMatch, setMapMatch] = useState(false);

  const testCall = async () => {
    const testData = await getSnappedData();
    setSnappedJson(testData);
    console.log(testData);
  };

  const setIsFilePickedHandler = (isPicked) => {
    setIsFilePicked(isPicked);
    console.log(isPicked);
  };

  const setFileContentHandler = (fileContent) => {
    setFileContent(fileContent);
    console.log(fileContent);
  };

  const setSelectedFileHandler = (file) => {
    setSelectedFile(file);
    console.log(file);
  };

  const setSendDataToMapHandler = (sendData) => {
    setSendDataToMap(sendData);
    console.log(sendData);
  };

  const setRawJsonHandler = (rawJson) => {
    setRawJson(rawJson);
    console.log(rawJson);
  };

  const setHandleMapMatchHandler = async () => {
    const testRawData = await mapMatch();
    console.log("Here", testRawData);

    const snappedData = await getSnappedData();
    setSnappedJson(snappedData);
  };

  const setSnappedGeopoints = (snappedGeopoints) => {
    setSnappedJson(snappedGeopoints);
    console.log(snappedGeopoints);
  };

  // useEffect(() => {
  //   getTest()
  //     .then((res) => {
  //       setTest(res.message);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="MainUI">
      <div className="LeftPanel">
        <div className="UserInput">
          <div className="Title">
            <img src={logo} height="40" width="40" />
            <h1>Map Match</h1>
          </div>
          <UploadFileCard
            onSetIsFilePicked={setIsFilePickedHandler}
            onSetFileContent={setFileContentHandler}
            onSetSelectedFile={setSelectedFileHandler}
            onSetRawJsonHandler={setRawJsonHandler}
            sendDataToMap={sendDataToMap}
          />
          <FileInformation
            isFilePicked={isFilePicked}
            fileContent={fileContent}
            selectedFile={selectedFile}
          />
          <ButtonBar
            onSetSendDataToMap={setSendDataToMapHandler}
            onSetHandleMapMatch={setHandleMapMatchHandler}
          />
        </div>
        <div className="OutputData">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </div>
      </div>
      <div className="Map">
        <Map rawJson={rawJson} snappedJson={snappedJson} />
      </div>
    </div>
  );
}

export default App;
