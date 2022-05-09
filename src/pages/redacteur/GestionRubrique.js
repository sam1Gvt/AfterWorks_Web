import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import articlesParRubriqueAPI from "../../services/articlesParRubriqueAPI";
import updateRubrique from "../../services/redacteur/updateRubrique";
import {Button, Form} from "react-bootstrap";
import trashIMG from "../../img/trash.svg";
import updateArticle from "../../services/redacteur/updateArticleAPI";



const GestionRubriqueArticle = ({history}) => {


    const { idRubrique } = useParams();
    const[rubrique, setRubrique] = useState([]);

    const fetchRubrique = async () => {
        try {
            const _rubrique = await articlesParRubriqueAPI.detailRubrique(idRubrique);
            setRubrique(_rubrique);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchRubrique();
    }, [])




    // State pour le username et le mot de passe
    const [titre,setTitre] = useState(rubrique.titre);
    const [description, setDescription] = useState(rubrique.description);



    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        await updateRubrique.updateRubrique(idRubrique, titre, description);

        history.replace("/Rubriques");

    }
    // suppression
    const deleteRubrique = async e => {
        e.preventDefault();

        await updateRubrique.deleteRubriqueAPI(idRubrique)
        history.replace("/Rubriques");

    }

    return  (


        <>
            <div className="mx-auto w-75">
                <h1> Rubrique :  {rubrique.titre}</h1>

                <div style={{marginTop: "60px", marginBottom: "30px"}}>
                    <button onClick={deleteRubrique} > <img src={trashIMG}  style={{width:"30px"}} /> Supprimer</button>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" defaultValue={rubrique.titre} required onChange={e => setTitre(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contenu</Form.Label>
                        <Form.Control as="textarea" rows={4} required defaultValue={rubrique.description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>

            </div>
        </>




    )
}

export default GestionRubriqueArticle;