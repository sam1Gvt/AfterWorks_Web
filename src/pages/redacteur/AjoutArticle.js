import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import ajoutArticleAPI from "../../services/redacteur/ajoutArticleAPI";
import {useParams} from "react-router-dom";



const AjoutArticle = ({history}) => {


    const {idRubrique} = useParams();

    // State pour le username et le mot de passe
    const [titre,setTitre] = useState();
    const [contenu, setContenu] = useState();
    const [date, setDate] = useState();




    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        ajoutArticleAPI(idRubrique, titre, contenu, date);

        history.replace("/Rubriques");

    }
    return  (


        <>
            <div className="mx-auto w-75">
                <h1>Article :</h1>


                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" required  onChange={e => setTitre(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"   required onChange={e => setDate(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contenu</Form.Label>
                        <Form.Control as="textarea" rows={10} required onChange={e => setContenu(e.target.value)}/>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>

            </div>
        </>




    )
}

export default AjoutArticle;