

import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import articleDetailAPI from "../services/articleDetailAPI";
import moment from "moment";

const ArticleDetail = () => {

    const { idArticle } = useParams();
    const[article, setArticle] = useState([]);

    const fetchArticle = async () => {
        try {
            const _article = await articleDetailAPI.getArticleDetail(idArticle);
            setArticle(_article);
        } catch (error){
            console.log(error);
        }
    }

    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchArticle();
    }, [])

    return  (


        <>

            <div className="container">
                <div className="row">
                    {

                         <div className="col-sm" key={article.idArticle}>

                             <p>Du {moment(article.dateCreationArticle).format('YYYY-MM-DD')}</p>
                             <h1 className="text-center mb-5"> {article.titre} </h1>
                                <p>
                                    {article.contenu}
                                </p>

                        </div>

                    }


                </div>
            </div>


        </>


    )
}

export default ArticleDetail;