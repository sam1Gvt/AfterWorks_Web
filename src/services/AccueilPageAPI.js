
import axios from "../config/axios";



const getProduits = () => {

    return axios
        .get("/produits")
        .then(response => response.data);
}

export default {getProduits};