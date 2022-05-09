import {Alert, Button, Form} from "react-bootstrap";
import {useState} from "react";
import AuthApi from "../services/AuthAPI";

const Connexion = ({onLogIn, history}) => {



    // State pour le username et le mot de passe
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    // Soumission du formulaire
    const handleSubmit = async e => {
        try{
            e.preventDefault();
            const token = await AuthApi.logIn(username,password);
            localStorage.setItem("token",token);
            onLogIn(true); // setIsAuthenticated(true)
            history.replace("/");
        }
        catch(error){
            setShowMessage(true);
        }

    }

    return (

        <div>
            {showMessage ? (
                <Alert variant="danger">
                    <Alert.Heading>Erreur</Alert.Heading>
                    <p>
                        Erreur dans votre user ou mot de passe. Veuillez réessayer !
                    </p>
                </Alert>
                )
                : (<div></div>)
            }
            <Form onSubmit={handleSubmit} className="mx-auto w-75" >
                <Form.Group className="mb-3">
                    <Form.Label >Email (username) : </Form.Label>
                    <Form.Control  placeholder="Entrez votre email" type="email" id="username" value={username}  onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Mot de passe" value={password}
                                  onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Connexion
                </Button>
            </Form>
        </div>

    )
}

export default Connexion;