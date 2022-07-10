import { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import "./input.css";


const path = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 }
];

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
};


function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileContent, setFileContent] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  let fileReader;

  const fileInputHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };


  const handleFileRead = (e) => {
    const content = fileReader.result;
    setFileContent(JSON.parse(content));
  }

  const handleSubmission = () => {
    console.log(selectedFile)
    try {
      fileReader = new FileReader()
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(selectedFile)
      console.log(fileContent)
    } catch (error) {
      console.log(error)
    }

  };

  const handleClear = () => {
    setSelectedFile();
    setIsFilePicked(false);
  };

  useEffect(() => {
    fetch("/result", {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileContent)
    }
    )
  }, [fileContent])

  const renderMap = () => {
    return (
      <div className="mainui">
        <GoogleMap
          center={{ lat: 39.09366509575983, lng: -94.58751660204751 }}
          zoom={8}
          mapContainerStyle={{
            height: "900px",
            width: "65%"
          }}
        >
          <Marker
            position={{ lat: 39.09366509575983, lng: -94.58751660204751 }}
          />
          <Polyline
            path={path}
            options={options}
          />
        </GoogleMap>

        <div className="fileInputDiv" >
          Upload JSON file
          <input type="file" className="fileInput" onChange={fileInputHandler} />
        </div>

        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default App