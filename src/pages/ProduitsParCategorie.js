

import React, {useState, useEffect} from "react";

import produitsParCategoriesAPI from "../services/produitsParCategoriesAPI";
import {useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import cafe from "../img/cafe.jpg";
import errorPage from "./ErrorPage";
import updateActivationProduit from "../services/admin/updateActivationProduitAPI";
import AuthAPI from "../services/AuthAPI";

const ProduitsParCategorie = ({history}) => {

    const { idCategory } = useParams();
    const[category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            const _category = await produitsParCategoriesAPI.getCategory(idCategory);
            setCategory(_category);
        } catch (error){
            history.replace("/ErrorPage");
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchCategory();
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

    return  (


    <>

        <div className="container">
            <div className="row">
                { category.map(produit => {

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

export default ProduitsParCategorie;