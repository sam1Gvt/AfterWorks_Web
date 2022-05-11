import axios from "../../config/axios";

const updateActivationProduit = (activation, id) => {

    return axios
        .put (`/updateActivationProduit/${id}`, {
            "activation":activation
        })
        .then()
}




export default updateActivationProduit;
