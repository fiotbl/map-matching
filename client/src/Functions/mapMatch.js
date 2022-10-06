import Axios from "axios";
import { getRawData } from "./getRawData";
import { postSnappedData } from "./postSnappedData";

export const mapMatch = async () => {

    const deleteSnappedGeopointsData = async () => {
        await Axios.delete("http://localhost:8080/deleteSnappedGeopoints").then((response) => {
            console.log("Deleted All Snapped GeoPoints")
        });
    }

    const rawData = await getRawData();

    console.log("Setting up API for map matching")

    var path = ""
    const googleurl = "https://roads.googleapis.com/v1/snapToRoads?path="
    const interpolate = "&interpolate=true&key="
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY

    for (let i = 0; i < rawData.length; i++) {
        path += String(rawData[i].lat) + "," + String(rawData[i].lng) + "|"
    }

    var url = googleurl + path.slice(0, -1) + interpolate + googleMapsApiKey
    console.log(url);

    var axios = require('axios');

    var config = {
        method: 'get',
        url: url,
        headers: {}
    };

    await deleteSnappedGeopointsData();
    console.log(" Finish Deleting Snapped Geopoints")


    await axios(config)
        .then(async function (response) {
            const rawSnappedPoints = response.data[Object.keys(response.data)[0]]
            console.log(rawSnappedPoints.map(el => el.location))
            let snappedPoints = rawSnappedPoints.map(el => el.location)
            snappedPoints = snappedPoints.map(item => {
                return {
                    lat: item.latitude,
                    lng: item.longitude
                };
            });
            console.log(snappedPoints)
            await Axios.post("http://localhost:8080/createSnappedGeopoints", snappedPoints).then((response) => {
                console.log("Created snapped geopoints")
            });
            console.log("Second")
            return snappedPoints;
        })
        .catch(function (error) {
            console.log(error);
        });
}
