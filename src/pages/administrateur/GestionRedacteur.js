import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import detailRedacteur from "../../services/admin/detailRedacteurAPI";
import updateRedacteurAPI from "../../services/admin/updateRedacteurAPI";
import trashIMG from "../../img/trash.svg";

const  GestionRedacteur = ({history}) => {


    const { idRedacteur } = useParams();
    const[redacteur, setRedacteur] = useState([]);
    const fetchRedacteur = async () => {
        try {
            const _redacteur = await detailRedacteur.getDetailRedacteur(idRedacteur);
            setRedacteur(_redacteur);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchRedacteur();
    }, [])





    // State pour le username et le mot de passe
    const [nom, setNom] = useState(redacteur.nomUtilisateur);
    const [prenom, setPrenom] = useState(redacteur.prenomUtilisateur);
    const [mail, setMail] = useState(redacteur.mailUtilisateur);
    const [adresse, setAdresse] = useState(redacteur.libRueUtilisateur);
    const [cp, setCP] = useState(redacteur.cpUtilisateur);
    const [ville, setVille] = useState(redacteur.villeUtilisateur);
    const [telephone, setTelephone] = useState(redacteur.telUtilisateur);
    const [password, setPassword] = useState(redacteur.password);




    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        await updateRedacteurAPI.updateRedacteurAPI(idRedacteur, nom, prenom, mail, adresse, cp, ville, telephone, password);

        history.replace("/Gestion/Redacteurs");

    }
    // suppression
    const deleteRedac = async e => {
        e.preventDefault();
        await updateRedacteurAPI.deleteRedacteurAPI(idRedacteur)
        history.replace("/Gestion/Redacteurs");

    }

    return  (


        <>
            <div className="mx-auto w-75">

                    <h1>Rédacteur : {redacteur.nomUtilisateur} </h1>

                <div style={{marginTop: "60px", marginBottom: "30px"}}>
                    <button onClick={deleteRedac} > <img src={trashIMG}  style={{width:"30px"}} /> Supprimer</button>
                </div>


                <Form onSubmit={handleSubmit} className="mb-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" defaultValue={redacteur.nomUtilisateur} required onChange={e => setNom(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text"  defaultValue={redacteur.prenomUtilisateur} required onChange={e => setPrenom(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Mail</Form.Label>
                        <Form.Control type="mail"  required defaultValue={redacteur.mailUtilisateur} onChange={e => setMail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text"  required defaultValue={redacteur.libRueUtilisateur} onChange={e => setAdresse(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control type="text"  required defaultValue={redacteur.cpUtilisateur} onChange={e => setCP(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text"  required defaultValue={redacteur.villeUtilisateur} onChange={e => setVille(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control type="tel"  required defaultValue={redacteur.telUtilisateur} onChange={e => setTelephone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control type="password"  required defaultValue={redacteur.password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>

            </div>
        </>




    )
}

export default GestionRedacteur;