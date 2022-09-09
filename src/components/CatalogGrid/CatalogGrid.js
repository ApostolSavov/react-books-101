import { useState } from "react";
import { useEffect } from "react";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import CatalogCard from "../CatalogCard/CatalogCard";
import { Urls } from "../../constants/Urls";
import axios from "axios";

const CatalogGrid = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    console.log('grid rendered');

    useEffect(() => {

        const controller = new AbortController();

        axios
            .get(`${Urls.devApi}/books`, {
                signal: controller.signal
            })
            .then(({ data }) => {
                setItems(data);
            })
            .catch(({ response }) => {
                setError(response.statusText);
            })
            .finally(() => {
                setLoaded(true);
            });

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="catalog-grid-wrapper">
            {!loaded &&
                <div className="generic-centering-wrapper">
                    <Spinner />
                </div>
            }
            {
                error ?
                    <div className="generic-centering-wrapper">
                        <h2>Error: {error}</h2>
                    </div>
                    :
                    <div className="catalog-grid">
                        {items.map(({ id, title, author, imageLink }) => (
                            <CatalogCard
                                key={id}
                                id={id}
                                title={title}
                                author={author}
                                imgSrc={imageLink} />))}
                    </div>
            }
        </div>
    );
};

export default CatalogGrid;