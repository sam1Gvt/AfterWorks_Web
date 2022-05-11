import axios from "../config/axios";
import jwtDecode from "jwt-decode";

const logIn = (username,password) => {
    return axios
        .post("/login_check",{"username":username,"password":password})
        .then(response => response.data.token);
}

const logOut = () => {
    localStorage.removeItem("token");
}


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const payload = jwtDecode(token);

        return payload.exp * 1000 > new Date().getTime();
    }
    return false;
}

const seeRoles = () => {
    const token = localStorage.getItem("token");
    if(token){
        const payload = jwtDecode(token);
        if(payload.exp * 1000 > new Date().getTime()){
            return payload.roles;
        }
        return false;
    }
    return false
}

const isRedac = () => {
    const arrayRoles = seeRoles();
    for(let i=0; i<arrayRoles.length; i++) {
        if("ROLE_REDAC" === arrayRoles[i] || "ROLE_ADMIN" === arrayRoles[i] ) {
            return true
        }
    }
    return false;
}

const isUser = () => {
    const arrayRoles = seeRoles();
    for(let i=0; i<arrayRoles.length; i++) {
        if("ROLE_USER" === arrayRoles[i] || "ROLE_REDAC" === arrayRoles[i] || "ROLE_ADMIN" === arrayRoles[i] ) {
            return true
        }
    }
    return false;
}

const isAdmin = () => {
    const arrayRoles = seeRoles();
    for(let i=0; i<arrayRoles.length; i++) {
        if("ROLE_ADMIN" === arrayRoles[i]) {
            return true
        }
    }
    return false;
}

const register = (email,password,nom,prenom, libRue, CP, ville, tel ) => {

    return axios
        .post ("/inscription", {
            "mail_utilisateur":email,
            "roles":["ROLE_USER"],
            "password":password,
            "nom_utilisateur":nom,
            "prenom_utilisateur":prenom,
            "lib_rue_utilisateur":libRue,
            "CP_utilisateur" : CP,
            "ville_utilisateur": ville,
            "tel_utilisateur" : tel
        })
        .then()
}



export default { logIn, logOut, isAuthenticated, register, seeRoles, isRedac, isAdmin, isUser};