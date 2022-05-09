import {Button, Form, Nav} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import AccueilPageAPI from "../services/AccueilPageAPI";
import servicePanier from "../services/servicePanier";
import trashIMG from "../img/trash.svg";



const Panier = ({history}) => {

    const [panier, setPanier] = useState([]);
    const[noTable, setNoTable] = useState(1);

    const fetchPanier = async () => {
        try {
            const _panier = JSON.parse(localStorage.getItem("panier"));

           setPanier(_panier);

        } catch (error){
            console.log(error);
        }
    }


    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchPanier();
    }, [])

    // ["idProduit : 2", "libelleProduit : Miel acacia - 250g", "prixHt : 6",
    // "quantiteProduit : 1", "libelleDeclinaison : Filtre", "idDeclinaisonProduit : 2"]
   const commander =  () => {
       try {
           // formater le panier (voir explication plus bas)
           let _panier = []
           for(let i=0; i<panier.length; i++){
               let row = panier[i][0]
               row = row.split(',')
               let idProduit = parseInt(row[0])
               let prixHt = parseInt(row[2])
               let quantiteProduit = parseInt(row[3])
               let idDeclinaisonProduit = 0

               // si le produit a une declinaison lui attribuer
               if(row[5]){
                   idDeclinaisonProduit = parseInt(row[5])
               }

               _panier.push({idProduit, prixHt, quantiteProduit, idDeclinaisonProduit});
           }
           _panier = JSON.stringify(_panier);
           servicePanier.CommanderPanier(_panier, noTable)
           localStorage.clear()
           history.push("/")
       } catch (error){
           console.log(error);
       }
    }

    const viderPanier = () => {
        localStorage.clear()
        history.push("/")
    }


    return (

        <div>
            <h1 style={{textAlign: "center", marginBottom:"90px"}}>Mon Panier</h1>


            <table className="table table-striped mt-5 m-auto w-75">
                <thead>
                {(panier != null &&(

                        <div style={{marginBottom: "15px"}}>
                            <button onClick={viderPanier} > <img src={trashIMG}  style={{width:"30px"}} /> Supprimer</button>
                        </div>

                    )

                )}

                <tr className="table-dark">
                    <th>Article</th>
                    <th>Prix</th>
                    <th>Quantité</th>

                </tr>
                </thead>
                <tbody>


                {(panier === null && (
                    <tr>
                        <td>Aucun article dans votre panier</td>
                        <td/>
                        <td/>
                    </tr>
                ))
                ||
                    panier.map(row => {
                        // je recupere la chaine
                        // ex : ["1,Nougatine noisettes - 150g,5"]
                        row = row[0]
                        // je la transforme en tableau
                        // ex : ["1", "Nougatine noisettes - 150g", "5"]
                        row = row.split(',')

                        return(
                            <tr key={row[0]}>
                                {/*Nom puis declinaison / prix / quantite*/}
                                <td>{row[1]} - {row[4]}</td>
                                <td>{row[2]}€</td>
                                <td>{row[3]}</td>

                            </tr>
                        ) }
                )
                }
                {(panier &&(
                    <>
                        Numero Table :
                        <input style={{width : 40, marginTop: 20, marginRight:100}} type="number" min="1"  step="1"
                                          value={noTable} onChange={e => setNoTable(e.target.value)} />

                        <Button  onClick={commander}
                                 variant="primary" className="btn-success">Commander</Button>
                    </>


                    )

                )}



                </tbody>
            </table>
        </div>

    )
}

export default Panier;