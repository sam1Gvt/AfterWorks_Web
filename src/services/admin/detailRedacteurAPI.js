import axios from "../../config/axios";



const getDetailRedacteur = (id) => {

    return axios
        .get(`/detailRedacteur/${id}`)
        .then(response => response.data);
}

export default {getDetailRedacteur};