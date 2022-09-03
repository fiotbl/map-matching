import { useState, useEffect } from "react";
import Map from "./Map/Map";
import UploadFileCard from "./Cards/UploadFileCard";
import FileInformation from "./Cards/FileInformation";
import ButtonBar from "./Cards/ButtonBar";
import "./App.css";
import logo from "./TitleImg.png";

// functions
import { getTest } from "./Functions/test";

function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  // const [test, setTest] = useState("Initial Value");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState();
  const [selectedFile, setSelectedFile] = useState();

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

  return (
    <div className="MainUI">
      <div className="UserInput">
        <div className="Title">
          <img src={logo} height="40" width="40" />
          <h1>Map Match</h1>
        </div>
        <UploadFileCard
          onSetIsFilePicked={setIsFilePickedHandler}
          onSetFileContent={setFileContentHandler}
          onSetSelectedFile={setSelectedFileHandler}
        />
        <FileInformation
          isFilePicked={isFilePicked}
          fileContent={fileContent}
          selectedFile={selectedFile}
        />
        <ButtonBar />
      </div>
      <div className="Map">
        <Map rawJson={rawJson} snappedJson={snappedJson} />
      </div>
    </div>
  );
}

export default App;
