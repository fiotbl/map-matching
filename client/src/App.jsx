import { useState, useEffect } from "react";
import Map from "./Map/Map";
import UserInput from "./UserInput/UserInput";
import "./App.css";
import logo from "./TitleImg.png";
import { Card, CardContent } from "@material-ui/core";

// functions
import { getTest } from "./Functions/test";

function App() {
  const [rawJson, setRawJson] = useState();
  const [snappedJson, setSnappedJson] = useState();
  // const [test, setTest] = useState("Initial Value");

  const setRawJsonHandler = (geopoints) => {
    setRawJson(geopoints);
    console.log(geopoints);
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
        <Card style={{ width: 400 }}>
          <CardContent>HELLO</CardContent>
        </Card>
        <UserInput
          onSetRawJson={setRawJsonHandler}
          OnSetSnappedGeopoints={setSnappedGeopoints}
        />
        {/* <h1> {test}</h1> */}
      </div>
      <div className="Map">
        <Map rawJson={rawJson} snappedJson={snappedJson} />
      </div>
    </div>
  );
}

export default App;
