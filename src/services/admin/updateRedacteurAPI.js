import axios from "../../config/axios";

const updateRedacteurAPI = (idRedacteur, nom, prenom, mail, adresse, cp, ville, telephone, password ) => {


    return axios
        .put (`/updateRedacteur/${idRedacteur}`, {
            "mail_utilisateur":mail,
            "roles":["ROLE_REDAC"],
            "password":password,
            "nom_utilisateur":nom,
            "prenom_utilisateur":prenom,
            "lib_rue_utilisateur":adresse,
            "CP_utilisateur" : cp,
            "ville_utilisateur": ville,
            "tel_utilisateur" : telephone,
            "abonnement_newsletter":false,

        })
        .then()
}

const deleteRedacteurAPI = (idRedacteur) => {
        return axios.delete(`/deleteRedacteur/${idRedacteur}`)
}



export default {updateRedacteurAPI, deleteRedacteurAPI};
