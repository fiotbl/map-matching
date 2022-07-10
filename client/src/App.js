import Map from './Map/Map'
import UserInput from './UserInput/UserInput'
import './App.css'

function App() {
  return (
    <div className="MainUI">
      <div className="Map">
        <Map />
      </div>
      <div className="UserInput">
        <UserInput />
      </div>
    </div>
  )
}

export default App