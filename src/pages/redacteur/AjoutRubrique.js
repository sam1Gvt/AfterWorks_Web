import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import ajoutRubriqueAPI from "../../services/redacteur/ajoutRubrique";


const AjoutRubrique = ({history}) => {

    // State pour le username et le mot de passe
    const [titre,setTitre] = useState();
    const [description, setDescription] = useState();

    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        ajoutRubriqueAPI(titre, description);

        history.replace("/Rubriques");

    }
    return  (


        <>
            <div className="mx-auto w-75">
                <h1>Nouvelle rubrique :</h1>


                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" required  onChange={e => setTitre(e.target.value)} />
                    </Form.Group>



                    <Form.Group className="mb-3" >
                        <Form.Label>Contenu</Form.Label>
                        <Form.Control as="textarea" rows={4} required onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>

            </div>
        </>




    )
}

export default AjoutRubrique;