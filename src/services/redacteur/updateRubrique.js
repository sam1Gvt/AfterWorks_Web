import axios from "../../config/axios";

const updateRubrique = (idRubrique, titre, description ) => {


    return axios
        .put (`/updateRubrique/${idRubrique}`, {
            "titre":titre,
            "description":description,

        })
        .then()
}

const deleteRubriqueAPI = (idRubrique) => {
    return axios.delete(`/deleteRubrique/${idRubrique}`)
}

export default {updateRubrique, deleteRubriqueAPI};
