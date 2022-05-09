
import axios from "../config/axios";


// Obtenir les articles d'une category
const getCategory = (id) => {

    return axios
        .get(`/category/${id}`)
        .then(response => response.data);
}

export default {getCategory};