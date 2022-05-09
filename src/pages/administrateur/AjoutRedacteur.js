import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import ajoutRedacteurAPI from "../../services/admin/ajoutRedacteurAPI";


const AjoutRedac = ({history}) => {


    // State pour le username et le mot de passe
    const [nom,setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [mail, setMail] = useState();
    const [adresse, setAdresse] = useState();
    const [cp, setCp] = useState();
    const [ville, setVille] = useState();
    const [telephone, setTelephone] = useState();
    const [password, setPassword] = useState();




    // Soumission du formulaire
    const handleSubmit = async => {
        ajoutRedacteurAPI(nom, prenom, mail, adresse, cp, ville, telephone, password);

        history.replace("/Gestion/Redacteurs");

    }
    return  (


        <>
            <div className="mx-auto w-75 mb-5">
                <h1>Rédacteur :</h1>


                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" required  onChange={e => setNom(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text"   required onChange={e => setPrenom(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Mail</Form.Label>
                        <Form.Control type="text" required onChange={e => setMail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" required  onChange={e => setAdresse(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control type="text" required  onChange={e => setCp(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text" required  onChange={e => setVille(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control type="tel" required  onChange={e => setTelephone(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control type="password" required  onChange={e => setPassword(e.target.value)} />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>

            </div>
        </>




    )
}

export default AjoutRedac;