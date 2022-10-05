import { useRef } from 'react';

import "./CatalogPage.scss";
import CatalogGrid from "../../components/CatalogGrid/CatalogGrid";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import CatalogSort from "../../components/CatalogSort/CatalogSort";

const CatalogPage = () => {
    const scrollAnchor = useRef(null);

    return (
        <div className="catalog-page">
            <div className='catalog-top-scroll-anchor' ref={scrollAnchor}></div>
            <div className="catalog-options-ribbon">
                <CatalogFilter>
                </CatalogFilter>
                <CatalogSort>
                </CatalogSort>
            </div>
            <CatalogGrid scrollAnchor={scrollAnchor} />
        </div>
    );
};

export default CatalogPage;