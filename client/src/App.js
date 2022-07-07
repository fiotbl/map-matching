import { useState } from "react";
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
  paths: [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }
  ],
  zIndex: 1
};


function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });
  const [userInput, setUserInput] = useState({
    enteredText: '',

  });

  const textChangeHandler = (event) => {
    setUserInput({
      enteredText: event.target.value,
    })
    console.log(userInput.enteredText)
  }

  const submitHandler = (event) => {
    event.preventDefault(); // prevent default of request being sent and page reloading
    const userGPSData = {
      data: userInput.enteredText,
    }
    // prop.onAddNewExpense(expenseData); // prop to pass data to NewExpense parent
    // console.log(expenseData.title);
    // console.log(expenseData.amount);
    // console.log(expenseData.date);
    setUserInput({
      enteredText: '',
    })
    console.log(userGPSData)

  };

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };


  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content)
  }

  const handleSubmission = () => {
    console.log(selectedFile)
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(selectedFile)
  };

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
        {/* <form onSubmit={submitHandler}>
          <label>
            GPS Data Json:
          </label>
          <textarea onChange={textChangeHandler}></textarea>
          <input type="submit" value="Submit" />
        </form> */}

        <div className="fileInputDiv" >
          Choose JSON file
          <input type="file" className="fileInput" onChange={changeHandler} />
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
        </div>
      </div>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default App