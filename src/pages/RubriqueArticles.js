

import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import articlesParRubriqueAPI from "../services/articlesParRubriqueAPI";
import cafe from "../img/cafe.jpg";

const RubriqueArticles = () => {

    const { idRubrique } = useParams();
    const[rubrique, setRubrique] = useState([]);

    const fetchRubrique = async () => {
        try {
            const _rubrique = await articlesParRubriqueAPI.getArticlesRubrique(idRubrique);
            setRubrique(_rubrique);
        } catch (error){
            const $error = error;
        }
    }
    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchRubrique();
    }, [])



    return  (


        <>

            <div className="container">
                <div className="row">


                    { (!(rubrique === "erreur aucun articles") && (
                        rubrique.map(article => {
                        return <div className="col-sm" key={article.idArticle}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={cafe} />
                                <Card.Body>
                                    <Card.Title>{article.titre}</Card.Title>
                                    {/*          <Card.Text>
                                    </Card.Text>*/}
                                    <Button href={`/Rubrique/Article/${article.idArticle}`} variant="primary">Voir</Button>
                                </Card.Body>
                            </Card>
                        </div>

                    }))) || (
                        <div>
                            <h1>Pas encore d'articles dans cette Rubrique</h1>
                        </div>
                    )

                    }
                </div>
            </div>


        </>


    )
}

export default RubriqueArticles;