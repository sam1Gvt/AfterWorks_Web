

import React, {useState, useEffect} from "react";
import {Button, Card} from "react-bootstrap";
import cafe from "../img/cafe.jpg";
import rubriquesAPI from "../services/rubriquesAPI";

const Rubriques = () => {


    const[rubriques, setRubriques] = useState([]);
    const fetchRubriques = async () => {
        try {
            const _rubriques = await rubriquesAPI.getRubriques();
            setRubriques(_rubriques);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchRubriques();
    }, [])



    return (
        <>

            <div className="container">
                <div className="row">

                    { rubriques.map(rubrique => {

                        return <div className="col-sm" key={rubrique.idRubrique}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={cafe} />
                                <Card.Body>
                                    <Card.Title>{rubrique.titre}</Card.Title>
                                    <Card.Text>
                                        {rubrique.description}
                                    </Card.Text>
                                    <Button href={`/Rubrique/Articles/${rubrique.idRubrique}`} variant="primary">Voir</Button>
                                </Card.Body>
                            </Card>
                        </div>

                    })

                    }
                </div>
            </div>


        </>


    )
}

export default Rubriques;