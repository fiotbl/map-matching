import Axios from "axios";

export const getMapboxSnappedData = async () => {
    const response = await Axios.get("http://localhost:8080/getMapboxSnappedGeopoints");
    return response.data;
}
