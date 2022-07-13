import { useState, useEffect } from "react";
import Map from './Map/Map'
import UserInput from './UserInput/UserInput'
import './App.css'

function App() {
  const [rawJson, setRawJson] = useState()

  const setRawJsonHandler = geopoints => {
    setRawJson(geopoints)
    console.log(geopoints)
  }

  return (
    <div className="MainUI">
      <div className="Map">
        <Map rawJson={rawJson} />
      </div>
      <div className="UserInput">
        <UserInput onSetRawJson={setRawJsonHandler} />
      </div>
    </div>
  )
}

export default App