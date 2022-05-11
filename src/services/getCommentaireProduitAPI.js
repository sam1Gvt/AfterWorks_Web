import axios from "../config/axios";



const getCommentaire = (idProduit) => {

    return axios
        .get(`/getCommentaireProduit/${idProduit}`)
        .then(response => response.data);
}
 const addCommentaireProduit = (idProduit, titre, description, date) => {
    idProduit = parseInt(idProduit);
    return axios
        .post(`/addCommentaireProduit`, {
            "idProduit":idProduit,
            "titre":titre,
            "description":description,
            "date":date
            }
        )
        .then()
 }
const ajoutArticleAPI = (idRubrique, titre, contenu, date ) => {


    idRubrique = parseInt(idRubrique);
    return axios
        .post ("/ajoutArticle", {
            "idRubrique":idRubrique,
            "titre":titre,
            "contenu":contenu,
            "dateCreationArticle":date,
        })
        .then()
}


export default {getCommentaire, addCommentaireProduit};