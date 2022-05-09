import {logDOM} from "@testing-library/react";


function Panier(props)
{
        const {produitsPanier} = props;
    console.log(produitsPanier);

        return (
            <div className="alert alert-info" style={{width:350, height:150}}>
                {
                    produitsPanier.length === 0 ? "Panier Vide" : <div> Vous avez {produitsPanier.length} produit(s) dans le panier </div>
                }
                <div>
                    <p>Panier indisponible</p>
                </div>
                { !(produitsPanier.length === 0) && (
                    <div>
                    </div>
                )}

            </div>
        )
    }
export default Panier;