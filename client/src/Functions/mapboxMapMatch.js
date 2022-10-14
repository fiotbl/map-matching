import Axios from "axios";
import { getRawData } from "./getRawData";

export const mapboxMapMatch = async () => {

    const deleteMapboxSnappedGeopointsData = async () => {
        await Axios.delete("http://localhost:8080/deleteMapboxSnappedGeopoints").then((response) => {
            console.log("Deleted All Mapbox Snapped GeoPoints")
        });
    }

    // 1. Get the raw data
    const rawData = await getRawData();
    console.log("Setting up Mapbox API for map matching")

    // 2. Format the string for the API call
    var path = ""
    const mapboxurl = "https://api.mapbox.com/matching/v5/mapbox/driving/"
    var urlend = "?access_token="

    for (let i = 0; i < rawData.length; i++) {
        path += String(rawData[i].lng) + "," + String(rawData[i].lat) + ";"
    }
    var url = mapboxurl + path.slice(0, -1) + urlend + process.env.REACT_APP_MAPBOX_API_KEY
    console.log(url)

    // 3. Delete existing data in the database
    await deleteMapboxSnappedGeopointsData();
    console.log(" Finish Deleting Mapbox Snapped Geopoints")

    // 4. Call the map-matching function using the string formatted in Step 2. 
    await Axios.get(url).then(async function (response) {
        var filtered = response.data.tracepoints.filter(function (el) {
            return el != null;
        });
        let snappedPoints = filtered.map(el => el.location)
        var newPoints = []
        for (let i = 0; i < snappedPoints.length; i++) {
            var dict = {
                lat: snappedPoints[i][1],
                lng: snappedPoints[i][0]
            }
            newPoints.push(dict)
        }
        // 5. Post the map-matched data into its respective database
        await Axios.post("http://localhost:8080/createMapboxSnappedGeopoints", newPoints).then((response) => {
            console.log("Created OSRM snapped geopoints")
        });
        return snappedPoints;
    })
}


