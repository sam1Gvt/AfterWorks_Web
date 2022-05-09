import axios from "../../config/axios";

const ajoutRedacteurAPI = (nom, prenom, mail, adresse, cp, ville, telephone, password ) => {

    return axios
        .post ("/ajoutRedac", {
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
export default ajoutRedacteurAPI;