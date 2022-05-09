import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import articlesParRubriqueAPI from "../../services/articlesParRubriqueAPI";
import pencilSquare from "../../img/pencil-square.svg";

import updateArticle from "../../services/redacteur/updateArticleAPI";
import updateRubrique from "../../services/redacteur/updateRubrique";
import trashIMG from "../../img/trash.svg";



const GestionRubriqueArticles = ({history}) => {

    const { idRubrique } = useParams();
    const[rubrique, setRubrique] = useState([]);

    const fetchArticlesRubrique = async () => {
        try {
            const _rubrique = await articlesParRubriqueAPI.getArticlesRubrique(idRubrique);
            setRubrique(_rubrique);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchArticlesRubrique();
    }, [])

    const[nameRubrique, setNameRubrique] = useState([]);

    const fetchNameRubrique = async () => {
        try {
            const _rubrique =  await articlesParRubriqueAPI.detailRubrique(idRubrique) ;
            setNameRubrique(_rubrique);
        } catch (error){
            console.log(error);
        }
    }



    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchNameRubrique();
    }, [])



/*    const goToNewPage = (what) => {
        const value = what.options[what.selectedIndex].value;
        if (value == "") return;
        window.location.href = value;
    }*/

    // suppression
    const deleteRubrique = async e => {
        e.preventDefault();

        await updateRubrique.deleteRubriqueAPI(idRubrique)
        history.replace("/Rubriques");

    }


    return  (


        <>
            <div className="mx-auto w-75">
                <h1>Liste des articles {nameRubrique.titre}</h1>

                <div style={{marginTop: "10px", marginBottom: "10px"}}>
                    <button onClick={deleteRubrique} > <img src={trashIMG}  style={{width:"30px"}} /> Supprimer</button>
                </div>

                <div className="mt-5">
                    <a href={`/Creation/Rubrique/Article/${idRubrique}`} className="btn btn-outline-success w-50 p-3">Ajouter un Article</a>
                    <a href={`/Gestion/Rubrique/${idRubrique}`} className="btn btn-outline-danger w-50 p-3 ">Modifier la Rubrique</a>
                 </div>


                <table className="table table-striped mt-5">
                    <thead>
                    <tr className="table-dark">
                        <th>Titre</th>
                        <th>Utilisateur</th>
                        <th>Date</th>
                        <th>Contenu</th>
                        <th/>

    {/*
                        <th>
                            <fieldset className="fld-typri">
                                <ul className="list-unstyled mb-0">
                                    <li className="cse2 coul2">
                                        <select onChange="{goToNewPage}" name="type_principal">
                                            <option selected>Trier par</option>
                                            <option value="index.php?action=tri&id=1">Titre</option>
                                            <option value="index.php?action=tri&id=2">Utilisateur</option>
                                            <option value="index.php?action=tri&id=3">Date</option>

                                        </select>
                                    </li>
                                </ul>
                            </fieldset>
                        </th>*/}

                    </tr>
                    </thead>
                    <tbody>


                    { (rubrique === "erreur aucun articles" && (
                        <tr>
                            <td >Aucun articles</td>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    ))
                    ||
                      rubrique.map(article => {
                        return <tr key={article.idArticle}>
                                    <td> {article.titre}</td>
                                    <td> {article.idUtilisateur}</td>

                                    {/*FORMATAGE DE LA DATE*/}
                                    <td> { new Date(article.dateCreationArticle).toLocaleDateString() }</td>

                                     {/*AFFICHER LES 50 PREMIERS CARACTERES*/}

                                    <td> {article.contenu.substring(0, 50)}</td>
                                    <td> <a href={`/Gestion/Rubrique/Article/${article.idArticle}`}> <img src={pencilSquare} alt="Modifier"/> </a></td>
                                </tr>
                    })

                    }



                    </tbody>
                </table>

            </div>
        </>




    )
}

export default GestionRubriqueArticles;