
import axios from "../config/axios";



const getCategories = () => {

    return axios
        .get("/categories")
        .then(response => response.data);
}

export default {getCategories};