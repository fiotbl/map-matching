import Axios from "axios";
import { getRawData } from "./getRawData";

export const OSRMMapMatch = async () => {

    const deleteOSRMSnappedGeopointsData = async () => {
        await Axios.delete("http://localhost:8080/deleteOSRMSnappedGeopoints").then((response) => {
            console.log("Deleted All OSRM Snapped GeoPoints")
        });
    }

    // 1. Get the raw data
    const rawData = await getRawData();
    console.log("Setting up OSRM API for map matching")

    // 2. Format the string for the API call
    var path = ""
    var radiuspath = ""
    const osrmurl = "http://router.project-osrm.org/match/v1/driving/"
    var urlend = "?overview=full&radiuses="
    for (let i = 0; i < rawData.length; i++) {
        path += String(rawData[i].lng) + "," + String(rawData[i].lat) + ";"
        radiuspath += "49;"
    }
    var url = osrmurl + path.slice(0, -1) + urlend + radiuspath.slice(0, -1)
    console.log(url)

    // 3. Delete existing data in the database
    await deleteOSRMSnappedGeopointsData();
    console.log(" Finish Deleting Snapped Geopoints")

    // 4. Call the map-matching function using the string formatted in Step 2. 
    await Axios.get(url).then(async function (response) {
        const rawSnappedPoints = response.data[Object.keys(response.data)[2]]
        let snappedPoints = rawSnappedPoints.map(el => el.location)
        var newPoints = []
        for (let i = 0; i < snappedPoints.length; i++) {
            var dict = {
                lat: snappedPoints[i][1],
                lng: snappedPoints[i][0]
            }
            newPoints.push(dict)
        }
        // 5. Post the map-matched data into its respective database
        await Axios.post("http://localhost:8080/createOSRMSnappedGeopoints", newPoints).then((response) => {
            console.log("Created OSRM snapped geopoints")
        });
        return snappedPoints;
    })
}


