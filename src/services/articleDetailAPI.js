
import axios from "../config/axios";



const getArticleDetail = (id) => {

    return axios
        .get(`/article/${id}`)
        .then(response => response.data);
}

export default {getArticleDetail};