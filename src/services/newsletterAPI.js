
import axios from "../config/axios";



const addNewsletter = (email) => {

    return axios
        .post(`/addNewsletter/${email}`)
        .then();
}

const desactiverNewsletter = (email) => {

    return axios
        .put(`/desactiverNewsletter/${email}`, {
            "abonnementNewsletter" : 1
        })
        .then();
}

export default {addNewsletter, desactiverNewsletter};