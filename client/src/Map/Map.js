import { useLoadScript, GoogleMap, Marker, Polyline, Circle } from "@react-google-maps/api";
import { useEffect } from "react";
import "./Map.css";

const Map = (prop) => {
    var lineColor;

    switch (prop.mapAlgorithm) {
        case 10:
            lineColor = "green"
            console.log("lineColor", lineColor)
            break;
        case 20:
            lineColor = "red"
            break;
        case 30:
            lineColor = "blue"
            break;
    }

    let usersPath = []
    if (prop.rawJson !== undefined) {
        console.log("entered first")
        let rawJson = prop.rawJson
        let rawGeopoints = rawJson[Object.keys(rawJson)[0]];

        for (const [_, value] of Object.entries(rawGeopoints)) {
            let dictJson = {}
            for (const [key_geopoint, value_geopoint] of Object.entries(value)) {
                if (key_geopoint === "lat") {
                    dictJson[key_geopoint] = value_geopoint;
                }
                else if (key_geopoint === "lng") {
                    dictJson[key_geopoint] = value_geopoint;
                }
            }
            usersPath.push(dictJson);
        }
    }

    let snappedGeopointsJson;
    console.log(prop.snappedJson)

    if (prop.snappedJson !== undefined && prop.snappedJson !== "") {
        console.log("entered")
        console.log(prop.snappedJson)
        let snappedJson = prop.snappedJson
        snappedGeopointsJson = snappedJson;
        console.log(typeof (snappedGeopointsJson))
    }

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
                        height: "946px",
                        width: "100%"
                    }}
                >
                    <ul>
                        {usersPath.map((geopoint, index) =>
                        (<Marker
                            position={{ key: index, lat: geopoint.lat, lng: geopoint.lng }}
                            icon={{
                                url: (require('../Marker.png')),
                                scale: 1,
                            }}
                            draggable="True"
                        />))}
                    </ul>
                    <Polyline
                        path={snappedGeopointsJson}
                        options={{
                            strokeColor: lineColor,
                            strokeOpacity: 2,
                            strokeWeight: 5,
                            fillColor: lineColor,
                            fillOpacity: 4,
                            clickable: false,
                            draggable: true,
                            editable: true,
                            visible: true,
                            radius: 30000,
                            zIndex: 1
                        }}
                    />
                </GoogleMap>
            </div>
        );
    };

    return isLoaded ? renderMap() : null;
}

export default Map;
