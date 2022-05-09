import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import articleDetailAPI from "../../services/articleDetailAPI";

import {Button, Form} from "react-bootstrap";
import moment from "moment";
import trashIMG from "../../img/trash.svg";
import updateArticle from "../../services/redacteur/updateArticleAPI";




const GestionRubriqueArticle = ({history}) => {


    const { idArticle } = useParams();
    const[article, setArticle] = useState([]);
    const fetchArticleDetail = async () => {
        try {
            const _article = await articleDetailAPI.getArticleDetail(idArticle);
            setArticle(_article);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchArticleDetail();
    }, [])

/*
    const dateFormat = new Date(article.dateCreationArticle).toLocaleDateString();
    console.log(dateFormat);

    const dateFormat2 = dateFormat.replace(/\//g, '-', );

    console.log(dateFormat2);
*/


    // State pour le username et le mot de passe
    const [titre,setTitre] = useState(article.titre);
    const [contenu, setContenu] = useState(article.contenu);
    const [date, setDate] = useState(moment(article.dateCreationArticle).format('YYYY-MM-DD'));



    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        await updateArticle.updateArticle(idArticle, titre, contenu, date);

        history.replace("/Rubriques");

    }

    // suppression
    const deleteArticle = async e => {
        e.preventDefault();

        await updateArticle.deleteArticle(idArticle)
        history.replace("/Rubriques");

    }

    return  (


        <>
            <div className="mx-auto w-75">
                <h1>Article : {article.titre}</h1>

                <div style={{marginTop: "60px", marginBottom: "30px"}}>
                    <button onClick={deleteArticle} > <img src={trashIMG}  style={{width:"30px"}} /> Supprimer</button>
                </div>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" defaultValue={article.titre} required onChange={e => setTitre(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"  defaultValue={moment(article.dateCreationArticle).format('YYYY-MM-DD')} required onChange={e => setDate(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contenu</Form.Label>
                        <Form.Control as="textarea" rows={10} required defaultValue={article.contenu} onChange={e => setContenu(e.target.value)}/>
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