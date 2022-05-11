import './App.css';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";

import AccueilPage from "./pages/AccueilPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import ProduitsParCategorie from "./pages/ProduitsParCategorie";
import ProduitDetail from "./pages/ProduitDetail";
import Connexion from "./pages/Connexion";
import {useState} from "react";
import AuthApi from "./services/AuthAPI";
import PrivateRouteRedac from "./components/privateRouteRedac";
import Inscription from "./pages/Inscription";
import Rubriques from "./pages/Rubriques";
import RubriqueArticles from "./pages/RubriqueArticles";
import ArticleDetail from "./pages/ArticleDetail";
import GestionRubriqueArticles from "./pages/redacteur/GestionRubriqueArticles";
import GestionRubriqueArticle from "./pages/redacteur/GestionRubriqueArticle";
import AjoutArticle from "./pages/redacteur/AjoutArticle";
import GestionRubrique from "./pages/redacteur/GestionRubrique";
import AjoutRubrique from "./pages/redacteur/AjoutRubrique";
import PrivateRouteAdmin from "./components/privateRouteAdmin";
import GestionRedacteurs from "./pages/administrateur/GestionRedacteurs";
import AjoutRedac from "./pages/administrateur/AjoutRedacteur";
import GestionRedacteur from "./pages/administrateur/GestionRedacteur";
import Newsletter from "./pages/Newsletter";
import Panier from "./pages/Panier";
import SuivieCommande from "./pages/SuivieCommande";

function App() {

    // State concernant le fait que l'utilisateur est authentifié ou non
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated);

    // Header n'est pas un composant routé à la base
    // withRouter permet au niveau du composant Header d'obtenir l'objet history
    // au niveau des props
    const HeaderWithRouter = withRouter(Header)

    const [produitsPanier, setProduitsPanier] = useState([]);

  return (

      <BrowserRouter>
          <HeaderWithRouter isAuthenticated={isAuthenticated} onLogOut={setIsAuthenticated}/>

          <Switch>
{/*
              <Route exact path="/" render={props => <AccueilPage updatePanier={setProduitsPanier} produitsPanier={produitsPanier} {...props}  />} />
*/}
              <Route exact path="/" component={AccueilPage} />
              <Route exact path="/Categorie/:idCategory" component={ProduitsParCategorie}/>
              <Route exact path="/Produit/:idProduit" component={ProduitDetail } />
              <Route exact path="/Connexion"  render={props => <Connexion onLogIn={setIsAuthenticated} {...props} /> } />
              <Route exact path="/Inscription" component={Inscription} />
              <Route exact path="/Rubriques"  component={Rubriques} />
              <Route exact path="/Rubrique/Articles/:idRubrique" component={RubriqueArticles}/>
              <Route exact path="/Rubrique/Article/:idArticle" component={ArticleDetail} />
              <Route exact path="/Newsletter" component={Newsletter} />
              <Route exact path="/Panier" component={Panier}/>
              <Route exact path="/SuivieCommande" component={SuivieCommande}/>


            {/*Refaire eventuellement les chemins pour les rendre plus explicite*/}
              <PrivateRouteRedac exact path="/Gestion/Rubrique/Articles/:idRubrique" component={GestionRubriqueArticles} />
              <PrivateRouteRedac exact path="/Gestion/Rubrique/Article/:idArticle" component={GestionRubriqueArticle} />
              <PrivateRouteRedac exact path="/Creation/Rubrique/Article/:idRubrique" component={AjoutArticle} />
              <PrivateRouteRedac exact path="/Gestion/Rubrique/:idRubrique" component={GestionRubrique} />
              <PrivateRouteRedac exact path="/Creation/Rubrique" component={AjoutRubrique} />

              <PrivateRouteAdmin exact path="/Gestion/Redacteurs" component={GestionRedacteurs}/>
              <PrivateRouteAdmin exact path="/Creation/Redacteur/" component={AjoutRedac}/>
              <PrivateRouteAdmin exact path="/Gestion/Redacteur/:idRedacteur" component={GestionRedacteur}/>


              <Route exact path="/ErrorPage" component={ErrorPage} />
              <Route path="*" component={ErrorPage}/>
          </Switch>

      </BrowserRouter>
  );
}

export default App;
