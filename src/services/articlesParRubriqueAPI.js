
import axios from "../config/axios";



const getArticlesRubrique = (id) => {

    return axios
        .get(`/rubrique/${id}`)
        .then(response => response.data);
}

const detailRubrique = (id) => {
    return axios
        .get(`/detailRubrique/${id}`)
        .then(response => response.data);
}

export default {getArticlesRubrique, detailRubrique};