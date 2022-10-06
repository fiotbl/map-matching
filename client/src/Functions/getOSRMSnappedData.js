import Axios from "axios";

export const getOSRMSnappedData = async () => {
    const response = await Axios.get("http://localhost:8080/getOSRMSnappedGeopoints");
    return response.data;
}
