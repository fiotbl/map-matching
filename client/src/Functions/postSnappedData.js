import Axios from "axios";

export const postSnappedData = async (snappedData) => {
    for (let i = 0; i < snappedData.length; i++) {
        await Axios.post("http://localhost:8080/createSnappedGeopoints", {
            lat: snappedData[i].location.latitude,
            lng: snappedData[i].location.longitude,
        }).then((response) => {
            console.log("First")
        });
    }
}
