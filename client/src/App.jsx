import { useState } from "react";
import Map from "./Map/Map";
import UploadFileCard from "./Cards/UploadFileCard";
import FileInformation from "./Cards/FileInformation";
import ButtonBar from "./Cards/ButtonBar";
import "./App.css";
import logo from "./TitleImg.png";
import DataOutput from "./Cards/DataOutput";
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';

// functions
import { getTest } from "./Functions/test";
import { getSnappedData } from "./Functions/getSnappedData";
import { getOSRMSnappedData } from "./Functions/getOSRMSnappedData";
import { mapMatch } from "./Functions/mapMatch";
import { OSRMMapMatch } from "./Functions/OSRMMapMatch";



function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [sendDataToMap, setSendDataToMap] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const [showSnappedData, setShowSnappedData] = useState(false);


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
    // const testRawData = await mapMatch();
    const testOSRM = await OSRMMapMatch();
    console.log("Here", testOSRM);

    // const snappedData = await getSnappedData();
    const OSRMSnappedData = await getOSRMSnappedData();

    setSnappedJson(OSRMSnappedData);
    setShowSnappedData(true);
  };

  const setShowRawDataHandler = () => {
    setShowRawData(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="MainUI">
        <div className="LeftPanel">
          <div className="UserInput">
            <div className="Title">
              <img src={logo} height="40" width="40" />
              <h1>Map-Matching</h1>
            </div>
            <UploadFileCard
              onSetIsFilePicked={setIsFilePickedHandler}
              onSetFileContent={setFileContentHandler}
              onSetSelectedFile={setSelectedFileHandler}
              onSetRawJsonHandler={setRawJsonHandler}
              sendDataToMap={sendDataToMap}
              onSetShowRawData={setShowRawDataHandler}
            />
            <FileInformation
              isFilePicked={isFilePicked}
              fileContent={fileContent}
              selectedFile={selectedFile}
            />

          </div>
          <div className="ButtonBarMain">
            <ButtonBar
              onSetSendDataToMap={setSendDataToMapHandler}
              onSetHandleMapMatch={setHandleMapMatchHandler}
            />
          </div>
          <div className="OutputData">
            <DataOutput
              showRawData={showRawData}
              showSnappedData={showSnappedData}
            />
          </div>
        </div>
        <div className="Map">
          <Map rawJson={rawJson} snappedJson={snappedJson} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
