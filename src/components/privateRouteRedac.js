import {Redirect, Route} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";

const PrivateRouteRedac = (props) => {
    const isRedac = AuthAPI.isRedac();
    return (
        isRedac
            ? <Route path={props.path} component={props.component} />
            : <Redirect to="/Connexion" />
    )
}

export default PrivateRouteRedac;