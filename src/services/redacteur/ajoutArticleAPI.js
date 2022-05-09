import axios from "../../config/axios";

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
export default ajoutArticleAPI;