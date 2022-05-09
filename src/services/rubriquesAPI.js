
import axios from "../config/axios";



const getRubriques = () => {

    return axios
        .get("/rubriques")
        .then(response => response.data);
}


export default {getRubriques};