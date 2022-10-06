import Axios from "axios";
import { getRawData } from "./getRawData";

export const OSRMMapMatch = async () => {

    const deleteOSRMSnappedGeopointsData = async () => {
        await Axios.delete("http://localhost:8080/deleteOSRMSnappedGeopoints").then((response) => {
            console.log("Deleted All OSRM Snapped GeoPoints")
        });
    }

    const rawData = await getRawData();

    console.log("Setting up OSRM API for map matching")

    // https://router.project-osrm.org/match/v1/driving/103.849782,1.344183;103.851311,1.343569?overview=full&radiuses=49;49

    var path = ""
    var radiuspath = ""
    const osrmurl = "http://router.project-osrm.org/match/v1/driving/"

    for (let i = 0; i < rawData.length; i++) {
        path += String(rawData[i].lng) + "," + String(rawData[i].lat) + ";"
        radiuspath += "49;"
    }

    var urlend = "?overview=full&radiuses="

    var url = osrmurl + path.slice(0, -1) + urlend + radiuspath.slice(0, -1)
    console.log(url);

    await deleteOSRMSnappedGeopointsData();
    console.log(" Finish Deleting Snapped Geopoints")

    Axios.get(url).then(async function (response) {
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
        console.log("Check final", newPoints)
        await Axios.post("http://localhost:8080/createOSRMSnappedGeopoints", newPoints).then((response) => {
            console.log("Created OSRM snapped geopoints")
        });
        return snappedPoints;
    })
}

