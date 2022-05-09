import {Redirect, Route} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";

const PrivateRouteAdmin = (props) => {
    const isAdmin = AuthAPI.isAdmin();
    return (
        isAdmin
            ? <Route path={props.path} component={props.component} />
            : <Redirect to="/Connexion" />
    )
}

export default PrivateRouteAdmin;