import React, {useEffect, useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import categoriesAPI from "../services/categoriesAPI";
import AuthAPI from "../services/AuthAPI";
import rubriquesAPI from "../services/rubriquesAPI";
import IMGperson from "../img/person.svg";
import IMGpanier from "../img/panier.png";


const Header = ({isAuthenticated, onLogOut, history}) => {

    /*-------------------------------------------------------------------------------------*/
    const[categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const _categories = await categoriesAPI.getCategories();
            setCategories(_categories);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchCategories();
    }, [])

    /*-------------------------------------------------------------------------------------*/

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


/*----------------------------------------------------------------------------------------------*/

   const seeRole = () => {
       if(AuthAPI.isRedac() || AuthAPI.isAdmin()){
           return true;
       }
       return false;
   }

   const isAdmin = () => {
       if(AuthAPI.isAdmin()){
           return true;
       }
       return false;
   }

   /*----------------------------------------------------------------------------------------------------*/
    // Mettre à jour la variable isAuthenticated dans le state du composant App
    const handleLogOut = () => {
        AuthAPI.logOut()    // setIsAuthenticated(false)
        onLogOut(false)
        // Naviguer vers la page de login
        history.push("/connexion")
    }

    /*-----------------------------------------------------------------------------------------------------*/
    const handleClick = () => {

        // Naviguer vers la page de login
        history.push("/Gestion/Redacteurs")
    }


return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-5">
        <Container>
            <Navbar.Brand href="/">AfterWorks</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" >
                    <NavDropdown title="Catégories" id="collasible-nav-dropdown" >

                        {
                            categories.map(category => {
                                return <NavDropdown.Item  key={category.idCategorie} href={`/Categorie/${category.idCategorie}`} >{category.libelleCategorie}</NavDropdown.Item>
                            })
                        }
                    </NavDropdown>
                    <Nav.Link href="/Rubriques" > Rubriques </Nav.Link>


                    {/*seeRole renvoie vrai si l'utilisateur est authentifier ET qu'il presente le role "ROLE_REDAC"*/}
                    {( seeRole() && (
                        <NavDropdown title="Gestion" id="collasible-nav-dropdown">
                            <NavDropdown.Item  href="/Creation/Rubrique" className="text-success" ><strong> Ajouter une Rubrique</strong></NavDropdown.Item>

                            {
                                rubriques.map(rubrique => {
                                    return <NavDropdown.Item  key={rubrique.idRubrique} href={`/Gestion/Rubrique/Articles/${rubrique.idRubrique}`} >
                                        {rubrique.titre}
                                    </NavDropdown.Item>
                                })
                            }
                        </NavDropdown>

                    ))
                    }

                </Nav>


                <Nav>
                    <Nav.Link href="/SuivieCommande" className="nav-link " >Suivie Commande | </Nav.Link>
                    <Nav.Link href="/Panier" className="nav-link " >Panier | </Nav.Link>
                </Nav>

               <Nav>
                   <Nav.Link href="/Newsletter" className="nav-link " >Newsletter </Nav.Link>

               </Nav>



                {(isAdmin() && (
                    <Nav>
                        <button type="button" className="btn btn-light" onClick={handleClick} style={{height:"44px"}}><img src={IMGperson}  alt="Mon compte"/></button>

                    </Nav>
                ))}

                {/* Bouton Connexion ou Deconnexion */}

                    {(!isAuthenticated && (
                        <Nav>
                            <Nav.Link href="/Connexion">Connexion</Nav.Link>
                        </Nav>
                        )) || (
                        <Nav>
                            <Nav.Link onClick={handleLogOut} className="nav-link btn-danger" >Déconnexion</Nav.Link>
                        </Nav>
                    )}



                {/* Bouton Inscription */}
                { (!isAuthenticated && (
                    <Nav>
                            <Nav.Link href="/Inscription" > Inscription </Nav.Link>
                    </Nav>
                ))}




            </Navbar.Collapse>
        </Container>

    </Navbar>)
}
export default Header;