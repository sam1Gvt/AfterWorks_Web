

import React, {useState, useEffect} from "react";


import {useParams} from "react-router-dom";
import produitDetailAPI from "../services/produitDetailAPI";
import image from "../img/cafe.jpg";
import IMGperson from "../img/person.svg";
import {Button, Form} from "react-bootstrap";
import getCommentaireProduitAPI from "../services/getCommentaireProduitAPI";
import moment from "moment";
import AuthAPI from "../services/AuthAPI";

const ProduitDetail = ({history}) => {

    const { idProduit } = useParams();
    const[produit, setProduit] = useState([]);
    const[commentaires, setCommentaires] = useState([]);
    const[declinaisonProduit, setDeclinaisonProduit] = useState([]);
    const[choixDeclinaison, setChoixDeclinaison] = useState("");
    const[idDeclinaison, setIdDeclinaison] = useState("");
    const[choixQuantite, setChoixQuantite] = useState(1);

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");

    const fetchProduit = async () => {
        try {
            const _produit = await produitDetailAPI.getProduit(idProduit);
            setProduit(_produit);
        } catch (error){
            console.log(error);
        }
    }
    const fetchCommentairesProduit = async () => {
        try {
            const _commentaire = await getCommentaireProduitAPI.getCommentaire(idProduit);
            setCommentaires(_commentaire);
        } catch (error){
            console.log(error);
        }
    }

    const fetchDeclinaisonProduit = async () => {
        try {
            const _declinaisonProduit = await produitDetailAPI.getDeclinaisonProduit(idProduit);
            setDeclinaisonProduit(_declinaisonProduit);
        } catch (error){
            console.log(error);
        }
    }
    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchDeclinaisonProduit();
    }, [])

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchProduit();
    }, [])
    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchCommentairesProduit();
    }, [])

    const addPanierLocalStorage = async (e) => {
        let panier = [];
        // recuperer le tableau des produits du panier
        if(localStorage.getItem("panier") != null){
            panier = (JSON.parse(localStorage.getItem("panier")));
        }
        panier.push([e.target.value]);
        await localStorage.setItem("panier", JSON.stringify(panier));

        history.push("/")
    }




    const addCommentaire = async e => {
        e.preventDefault();

        // 2001-09-18T00:00:00+02:00
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+'T'+time;

        console.log(idProduit, titre, description, dateTime)
        await getCommentaireProduitAPI.addCommentaireProduit(idProduit, titre, description, dateTime)
        window.location.reload();
    }

    const seeRole = () => {
        if(AuthAPI.isUser()){
            return true;
        }
        return false;
    }

    return  (


        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={image} alt="Image du produit" width="100%"/>
                        {seeRole() &&
                            <div>
                                <h1 style={{marginBottom:"20px", fontSize: "20px", marginTop: "50px"}}>Donner votre Avis</h1>
                                <Form onSubmit={addCommentaire} className=" w-75" >
                                    <Form.Group className="mb-3">
                                        <Form.Label >Titre : </Form.Label>
                                        <Form.Control type="text" id="titre"  required onChange={e => setTitre(e.target.value)} />

                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label >Description : </Form.Label>
                                        <Form.Control type="text" id="description" required onChange={e => setDescription(e.target.value)} />
                                    </Form.Group>


                                    <Button variant="primary" type="submit">
                                        Valider
                                    </Button>
                                </Form>
                            </div>
                        }


                        <div style={{marginTop: 40}}>
                            <span style={{fontWeight: "bold", fontSize:25}}>Commentaire(s) :</span>
                            {commentaires.map(commentaire =>{
                                return (
                                    <div style={{marginTop : 20, marginBottom:20}} key={commentaire.idCommentaire}>
                                    <div>-Du : {moment(commentaire.date).format('YYYY-MM-DD')}</div>
                                    <div style={{fontWeight: "bold"}}>Titre : {commentaire.titre}</div>
                                    <div>{commentaire.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col" >
                        <ul style={{marginLeft: 70, listStyle: "none"}}>

                            <li style={{marginBottom:40, fontSize: 25}}>  <span style={{fontWeight: "bold"}}> Titre : </span>  {produit.libelleProduit}  </li>
                            <li style={{marginBottom:40, fontSize: 25}}>  <span style={{fontWeight: "bold"}}> Prix : </span> {produit.prixUnitaireHt}  €</li>
                            <li style={{marginBottom:40, fontSize: 20}}>  <span style={{fontWeight: "bold"}}>{produit.descriptionProduit ? "Description :" : ""} </span> {produit.descriptionProduit}  </li>


                            {declinaisonProduit.map(declinaison => {
                               return (
                                    <li key={declinaison.idDeclinaison}>
                                    <input type="radio" name="declinaisonProduit"
                                           value={declinaison.libelleDeclinaison}

                                           onChange={e => {
                                               setChoixDeclinaison(e.target.value)
                                               setIdDeclinaison(declinaison.idDeclinaison)
                                           }}
                                           key={declinaison.idDeclinaison}/>
                                    {declinaison.libelleDeclinaison}
                                    </li>
                                )
                            })
                            }
                            <input style={{width : 40, marginTop: 20}} type="number" min="1" max="30" step="1" value={choixQuantite} onChange={e => setChoixQuantite(e.target.value)} />
                        </ul>

                        {produit.activation &&
                            <Button  style={{marginLeft: 105, marginTop:35}} onClick={addPanierLocalStorage}
                                //value={[`idProduit : ${produit.idProduit}`, `libelleProduit : ${produit.libelleProduit}`, `prixHt : ${produit.prixUnitaireHt}`,`quantiteProduit : ${choixQuantite}`,`libelleDeclinaison : ${choixDeclinaison}` ,`idDeclinaisonProduit : ${idDeclinaison}`]}
                                     value={[produit.idProduit, produit.libelleProduit, produit.prixUnitaireHt,choixQuantite,choixDeclinaison, idDeclinaison]}
                                     variant="primary" className="btn-success">Ajouter Panier</Button>

                        }


                    </div>


                </div>
            </div>

        </>


    )
}

export default ProduitDetail;