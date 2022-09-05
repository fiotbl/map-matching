import Axios from "axios";

export const getSnappedData = async () => {
    const response = await Axios.get("http://localhost:8080/getSnappedGeopoints");
    return response.data;
}
