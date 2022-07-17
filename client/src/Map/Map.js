import { useLoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import "./Map.css";

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

const Map = (prop) => {
    let usersPath = []
    if (prop.rawJson !== undefined) {
        let rawJson = prop.rawJson
        let rawGeopoints = rawJson[Object.keys(rawJson)[0]];
        console.log(rawGeopoints);

        for (const [key, value] of Object.entries(rawGeopoints)) {
            let dictJson = {}
            for (const [key_geopoint, value_geopoint] of Object.entries(value)) {
                if (key_geopoint === "lat") {
                    dictJson[key_geopoint] = value_geopoint;
                    console.log(dictJson);
                }
                else if (key_geopoint === "lng") {
                    dictJson[key_geopoint] = value_geopoint;
                    console.log(dictJson);
                }
            }
            usersPath.push(dictJson);
        }
        console.log(usersPath)
    }

    let snappedGeopointsJson;

    if (prop.snappedJson !== undefined) {
        let snappedJson = prop.snappedJson
        snappedJson = snappedJson.replace(/'/g, '"')
        console.log(snappedJson)
        snappedGeopointsJson = JSON.parse(snappedJson);
        console.log(typeof (snappedGeopointsJson))
    }



    // let snappedGeopointsJson = JSON.parse(prop.snappedJson)
    // console.log(prop.snappedJson)

    // let snappedGeopointsJson = JSON.parse(JSON.stringify(snappedJson));
    // console.log(typeof (snappedGeopointsJson))

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    });

    const renderMap = () => {
        return (
            <div className="MapUI">
                <GoogleMap
                    center={{ lat: 1.3521, lng: 103.8198 }}
                    zoom={12}
                    mapContainerStyle={{
                        height: "900px",
                        width: "95%"
                    }}
                >
                    <ul>
                        {usersPath.map((geopoint, index) =>
                        (<Marker
                            position={{ lat: geopoint.lat, lng: geopoint.lng, key: index }}
                        />))}
                    </ul>
                    <Polyline
                        path={snappedGeopointsJson}
                        options={options}
                    />
                </GoogleMap>
            </div>
        );
    };

    return isLoaded ? renderMap() : null;
}

export default Map;
