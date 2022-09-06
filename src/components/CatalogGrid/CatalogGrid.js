import { useState } from "react";
import { useEffect } from "react";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import { Urls } from "../../constants/Urls";
import axios from "axios";

const CatalogGrid = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {

        axios
            .get(`${Urls.devApi}books`)
            .then(({ data }) => {
                setItems(data);
            })
            .catch(({ response }) => {
                console.log(response);
            });

    }, []);

    return (
        <div className="catalog-grid__wrapper">
            <div className="catalog-grid">
                {
                    items.length == 0 ?
                        <Spinner />
                        :
                        <div>
                            {items.map((item) => (<div key={item.id}>{item.author}</div>))}
                        </div>
                }
            </div>
        </div>
    );
};

export default CatalogGrid;