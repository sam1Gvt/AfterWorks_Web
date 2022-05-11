import {Button, Form, Nav} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import getStatutCommand from "../services/getCommandesAPI";



const SuivieCommande = ({history}) => {

    const [commande, setCommande] = useState([]);
    const[noCommande, setNoCommande] = useState(0);

    const fetchCommande = async (idCommande) => {
        try {
            const _commande = await getStatutCommand(idCommande);
            setCommande(_commande);

        } catch (error){
            console.log(error);
        }
    }
    const voirStatutCommande = async () => {
        await fetchCommande(noCommande)
    }


    return (

        <div>
            <div className="container">
                <h1 style={{textAlign: "center", marginBottom:"90px"}}>Suivre ma commande</h1>
                <div style={{marginLeft: "160px"}}>
                    Numéro commande :
                    <input style={{width : 100, marginTop: 20, marginRight: "50px"}} type="number" min="0"  step="1"
                           value={noCommande} onChange={e => setNoCommande(e.target.value)} />
                    <Button  onClick={voirStatutCommande}
                             variant="primary" className="btn-success">Voir son état</Button>
            </div>

            <table className="table table-striped mt-5 m-auto w-75">
                <thead>

                <tr className="table-dark">
                    <th>Commande</th>
                    <th>Etat</th>
                </tr>
                </thead>



                <tbody>
                {(commande.length == 0 && (
                    <tr>
                        <td>Aucune commande</td>
                        <td/>
                    </tr>
                ))
                }
                { (commande != 0 &&(
                    <tr>
                        <td> {noCommande}</td>
                        <td> {commande[0].libelleStatut}</td>
                    </tr>
                ))
                }



                </tbody>
            </table>

            </div>
        </div>

    )
}

export default SuivieCommande;