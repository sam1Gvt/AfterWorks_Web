

import React, {useState, useEffect} from "react";
import AccueilPageAPI from "../services/AccueilPageAPI";
import {Button, Card, Nav} from "react-bootstrap";
import cafe from "../img/cafe.jpg";
import Panier from "../components/Panier";
import panier from "../services/servicePanier";
import {Link} from "react-router-dom";
import updateActivationProduit from "../services/admin/updateActivationProduitAPI";
import IMGperson from "../img/person.svg";
import AuthAPI from "../services/AuthAPI";

const AccueilPage = ({history}) => {

    const[produits, setProduits] = useState([]);

    const fetchProduits = async () => {
        try {
            const _produits = await AccueilPageAPI.getProduits();
            setProduits(_produits);
        } catch (error){
            console.log(error);
        }
    }


    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchProduits();
    }, [])


    const updateActivation = async (activation, idProduit) => {
        try {
            let _activation;
            if(activation){
                _activation = false
            }
            else {
                _activation = true
            }
            await updateActivationProduit(_activation, idProduit);
            window.location.reload();

        } catch (error){
            console.log(error);
        }
    }

    const voirDetail = (e) => {
        history.push(`/Produit/${e.target.value}`)
    }
    const isAdmin = () => {
        if(AuthAPI.isAdmin()){
            return true;
        }
        return false;
    }

    return (
        <>
            {/*<Panier produitsPanier={produitsPanier}/>*/}

            <div className="container">


                <div className="row">

                    { produits.map(produit => {

                        return (<div className="col-sm" key={produit.idProduit}>
                            <Card style={{ width: '350px', height: '400px', marginBottom: "50px" }} >
                               <a href={`/Produit/${produit.idProduit}`}> <Card.Img variant="top" src={cafe}  /></a>
                                <Card.Body>
                                    <Card.Title>{produit.libelleProduit}</Card.Title>
                                    <Card.Text>
                                        <strong>Prix : {produit.prixUnitaireHt} €</strong>

                                    </Card.Text>


                                </Card.Body>
                                <div >


                                    <Button  onClick={voirDetail} value={produit.idProduit} variant="primary" className="btn-success"> Voir </Button>

                                    {(isAdmin() && (
                                        <Button  onClick={() => updateActivation(produit.activation, produit.idProduit)}> {produit.activation ? "Activer" : "Désactiver"} </Button>

                                    ))}

                                </div>
                            </Card>
                        </div> )

            })

            }

                </div>

            </div>


        </>


    )
}

export default AccueilPage;