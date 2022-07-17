import { useState, useEffect } from "react";
import Map from './Map/Map'
import UserInput from './UserInput/UserInput'
import './App.css'

function App() {
  const [rawJson, setRawJson] = useState()
  const [snappedJson, setSnappedJson] = useState()

  const setRawJsonHandler = geopoints => {
    setRawJson(geopoints)
    console.log(geopoints)
  }

  const setSnappedGeopoints = snappedGeopoints => {
    setSnappedJson(snappedGeopoints)
    console.log(snappedGeopoints)
  }

  return (
    <div className="MainUI">
      <div className="Map">
        <Map rawJson={rawJson} snappedJson={snappedJson} />
      </div>
      <div className="UserInput">
        <UserInput onSetRawJson={setRawJsonHandler} OnSetSnappedGeopoints={setSnappedGeopoints} />
      </div>
    </div>
  )
}

export default App