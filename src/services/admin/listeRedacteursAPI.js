
import axios from "../../config/axios";



const getAllRedac = () => {

    return axios
        .get("/getAllRedac")
        .then(response => response.data);
}


export default {getAllRedac};