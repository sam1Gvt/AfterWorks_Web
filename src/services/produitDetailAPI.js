
import axios from "../config/axios";



const getProduit = (id) => {

    return axios
        .get(`/produit/${id}`)
        .then(response => response.data);
}

const getDeclinaisonProduit = (id) => {
    return axios
        .get(`produit/declinaison/${id}`)
        .then(response => response.data);
}

export default {getProduit, getDeclinaisonProduit};