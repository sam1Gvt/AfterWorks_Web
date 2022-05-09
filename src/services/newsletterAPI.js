
import axios from "../config/axios";



const addNewsletter = (email) => {

    return axios
        .post(`/Newsletter`, {
            "email": email
        })
        .then();
}

export default {addNewsletter};