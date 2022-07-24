import { useState, useEffect } from "react";
import Map from "./Map/Map";
import UserInput from "./UserInput/UserInput";
import "./App.css";

// functions
import { getTest } from "./Functions/test";

function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  const [test, setTest] = useState("Initial Value");

  const setRawJsonHandler = (geopoints) => {
    setRawJson(geopoints);
    console.log(geopoints);
  };

  const setSnappedGeopoints = (snappedGeopoints) => {
    setSnappedJson(snappedGeopoints);
    console.log(snappedGeopoints);
  };

  useEffect(() => {
    getTest()
      .then((res) => {
        setTest(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="MainUI">
      <div className="Map">
        <Map rawJson={rawJson} snappedJson={snappedJson} />
      </div>
      <div className="UserInput">
        <UserInput
          onSetRawJson={setRawJsonHandler}
          OnSetSnappedGeopoints={setSnappedGeopoints}
        />
        <h1> {test}</h1>
      </div>
    </div>
  );
}

export default App;
