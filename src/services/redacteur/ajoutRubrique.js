import axios from "../../config/axios";

const ajoutRubriqueAPI = (titre, description ) => {


    return axios
        .post ("/ajoutRubrique", {
            "titre":titre,
            "description":description

        })
        .then()
}
export default ajoutRubriqueAPI;