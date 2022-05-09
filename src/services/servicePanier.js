import axios from "../config/axios";


const AddPanier = (id) => {

    localStorage.setItem("id", JSON.stringify(id));
    return localStorage.setItem("id" , id);
}



const CommanderPanier = (panier, noTable) => {
    return axios
        .post (`/addProduitsCommande/${noTable}`, panier)
        .then()
}

export default {AddPanier, CommanderPanier};