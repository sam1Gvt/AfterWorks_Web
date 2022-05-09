import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import AuthApi from "../services/AuthAPI";
import newsletterAPI from "../services/newsletterAPI";

const Newsletter = ({history}) => {



    // State pour le username et le mot de passe
    const [email,setEmail] = useState("");

    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        newsletterAPI.addNewsletter(email);
        history.replace("/");
    }

    return (

        <div>
            <h1 style={{textAlign: "center", marginBottom:"90px"}}>S'inscrire à la newsletter</h1>
            <Form onSubmit={handleSubmit} className="mx-auto w-75" >
                <Form.Group className="mb-3">
                    <Form.Label >Email : </Form.Label>
                    <Form.Control placeholder="Entrez votre email" type="email" id="email"  onChange={e => setEmail(e.target.value)} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        </div>

    )
}

export default Newsletter;