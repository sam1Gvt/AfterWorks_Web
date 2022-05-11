import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import AuthAPI from "../services/AuthAPI";

const Inscription = ({history}) => {


    // State pour le username et le mot de passe
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [libRue, setLibRue] = useState("");
    const [CP, setCP] = useState("");
    const [ville, setVille] = useState("");
    const [tel, setTel] = useState("");


    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();

        AuthAPI.register(email,password,nom,prenom, libRue, CP, ville, tel);
/*        const token = await AuthAPI.logIn(email,password);
        localStorage.setItem("token",token);*/
        //onLogIn(true); // setIsAuthenticated(true)
        history.replace("/Connexion");

    }


    return (
        <div>
            <h1 className="text-center mt-3 "> Formulaire d'inscription </h1>
            <Form onSubmit={handleSubmit} className="mx-auto w-75 mb-5" >
                <Form.Group className="mb-3">
                    <Form.Label >Email : </Form.Label>
                    <Form.Control placeholder="Entrez votre email" type="email" required onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label placeholder="Entrez votre nom" >Nom : </Form.Label>
                    <Form.Control placeholder="Entrez votre nom" type="text"  required onChange={e => setNom(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prénom : </Form.Label>
                    <Form.Control placeholder="Entrez votre prénom" type="text" required onChange={e => setPrenom(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Adresse: </Form.Label>
                    <Form.Control placeholder="Entrez votre adresse"  type="text"   required onChange={e => setLibRue(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label  >Code Postal : </Form.Label>
                    <Form.Control placeholder="Entrez votre code postal" type="text" required onChange={e => setCP(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Ville : </Form.Label>
                    <Form.Control placeholder="Entrez votre ville" type="text" required onChange={e => setVille(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label  >Téléphone : </Form.Label>
                    <Form.Control placeholder="Entrez votre numéro de téléphone" type="tel" required  onChange={e => setTel(e.target.value)} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password"  placeholder="Entrez votre numéro de mot de passe" required
                                  onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    S'inscrire
                </Button>
            </Form>
        </div>
    )

}
export default Inscription;