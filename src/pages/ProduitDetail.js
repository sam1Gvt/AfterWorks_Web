

import React, {useState, useEffect} from "react";


import {useParams} from "react-router-dom";
import produitDetailAPI from "../services/produitDetailAPI";
import image from "../img/cafe.jpg";
import IMGperson from "../img/person.svg";
import {Button} from "react-bootstrap";

const ProduitDetail = ({history}) => {

    const { idProduit } = useParams();
    const[produit, setProduit] = useState([]);
    const[declinaisonProduit, setDeclinaisonProduit] = useState([]);
    const[choixDeclinaison, setChoixDeclinaison] = useState("");
    const[idDeclinaison, setIdDeclinaison] = useState("");
    const[choixQuantite, setChoixQuantite] = useState(1);

    const fetchProduit = async () => {
        try {
            const _produit = await produitDetailAPI.getProduit(idProduit);
            setProduit(_produit);
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

    return  (


        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={image} alt="Image du produit" width="100%"/>
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


                        <Button  style={{marginLeft: 105, marginTop:35}} onClick={addPanierLocalStorage}
                                 //value={[`idProduit : ${produit.idProduit}`, `libelleProduit : ${produit.libelleProduit}`, `prixHt : ${produit.prixUnitaireHt}`,`quantiteProduit : ${choixQuantite}`,`libelleDeclinaison : ${choixDeclinaison}` ,`idDeclinaisonProduit : ${idDeclinaison}`]}
                                 value={[produit.idProduit, produit.libelleProduit, produit.prixUnitaireHt,choixQuantite,choixDeclinaison, idDeclinaison]}
                                 variant="primary" className="btn-success">Ajouter Panier</Button>

                    </div>


                </div>
            </div>

        </>


    )
}

export default ProduitDetail;