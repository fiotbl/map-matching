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
import { getSnappedData } from "./Functions/getSnappedData";
import { getOSRMSnappedData } from "./Functions/getOSRMSnappedData";
import { getMapboxSnappedData } from "./Functions/getMapboxSnappedData";
import { mapMatch } from "./Functions/mapMatch";
import { OSRMMapMatch } from "./Functions/OSRMMapMatch";
import { mapboxMapMatch } from "./Functions/mapboxMapMatch";


function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [sendDataToMap, setSendDataToMap] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const [showSnappedData, setShowSnappedData] = useState(false);
  const [algorithm, setAlgoritm] = useState();
  const [mapAlgorithm, setMapAlgoritm] = useState();


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
    var snappedData;
    switch (algorithm) {
      case 10:
        await mapMatch();
        snappedData = await getSnappedData();
        break;
      case 20:
        await OSRMMapMatch();
        snappedData = await getOSRMSnappedData();
        break;
      case 30:
        await mapboxMapMatch();
        snappedData = await getMapboxSnappedData();
        break;
    }
    setSnappedJson(snappedData);
    setShowSnappedData(!showSnappedData);
    setMapAlgoritm(algorithm);
  };

  const setShowRawDataHandler = () => {
    setShowRawData(true);
  };

  const setAlgoritmHandler = (algorithm) => {
    setAlgoritm(algorithm);
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
              onSetAlgoritm={setAlgoritmHandler}
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
              algorithm={algorithm}
            />
          </div>
        </div>
        <div className="Map">
          <Map rawJson={rawJson} snappedJson={snappedJson} mapAlgorithm={mapAlgorithm} showSnappedData={showSnappedData} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
