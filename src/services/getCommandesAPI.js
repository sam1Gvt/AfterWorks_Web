import axios from "../config/axios";



const getStatutCommand = (idCommand) => {

    return axios
        .get(`/statut/command/${idCommand}`)
        .then(response => response.data);
}


export default getStatutCommand;