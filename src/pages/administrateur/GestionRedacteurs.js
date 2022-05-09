import React, {useState, useEffect} from "react";
import pencilSquare from "../../img/pencil-square.svg";
import listeRedacteursAPI from "../../services/admin/listeRedacteursAPI";



const GestionRedacteurs = () => {

    const[redacteurs, setRedacteurs] = useState([]);

    const fetchRedacteurs = async () => {
        try {
            const _redacteurs = await listeRedacteursAPI.getAllRedac();
            setRedacteurs(_redacteurs);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchRedacteurs();
    }, [])



    return  (


        <>
            <div className="mx-auto w-75">
                <h1>Liste des rédacteurs :</h1>

                <div className="mt-5">
                    <a href={`/Creation/Redacteur/`} className="btn btn-outline-success  p-3">Ajouter un Rédacteur</a>
                </div>


                <table className="table table-striped mt-5">
                    <thead>
                    <tr className="table-dark">
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Mail</th>
                        <th>Adresse</th>
                        <th>CP</th>
                        <th>Ville</th>
                        <th>Téléphone</th>
                        <th></th>



                    </tr>
                    </thead>
                    <tbody>


                    { (redacteurs.length === 0 && (
                        <tr>
                            <td >Aucun redacteurs</td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    ))}

                    { redacteurs.map(redacteur => {
                        return <tr key={redacteur.idUtilisateur}>
                            <td> {redacteur.nomUtilisateur}</td>
                            <td> {redacteur.prenomUtilisateur}</td>
                            <td> {redacteur.mailUtilisateur}</td>
                            <td> {redacteur.libRueUtilisateur}</td>
                            <td> {redacteur.cpUtilisateur}</td>
                            <td> {redacteur.villeUtilisateur}</td>
                            <td> {redacteur.telUtilisateur}</td>
                            {/*<td> <a href={`/Gestion/Redacteur/${redacteur.idUtilisateur}`}> <img src={pencilSquare} alt="Modifier" className="w-75"/> </a></td>*/}
                            <td> <a href={`/Gestion/Redacteur/${redacteur.idUtilisateur}`}> <img src={pencilSquare} alt="Modifier" /> </a></td>
                        </tr>
                    })

                    }



                    </tbody>
                </table>

            </div>
        </>




    )
}

export default GestionRedacteurs;