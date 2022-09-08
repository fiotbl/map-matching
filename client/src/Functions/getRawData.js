import Axios from "axios";

export const getRawData = async () => {
    const response = await Axios.get("http://localhost:8080/getRawGeopoints");
    console.log("Got Raw Data")

    return response.data;
}
