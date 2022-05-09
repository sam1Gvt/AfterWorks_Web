import axios from "../../config/axios";

const updateArticle = (idArticle, titre, contenu, date ) => {


    return axios
        .put (`/updateArticle/${idArticle}`, {
            "titre":titre,
            "contenu":contenu,
            "dateCreationArticle":date,

        })
        .then()
}

const deleteArticle = (idArticle) => {
    return axios.delete(`/deleteArticle/${idArticle}`)
}

export default {updateArticle, deleteArticle};
