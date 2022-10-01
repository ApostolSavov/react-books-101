import './CatalogPagination.scss';

import { useSearchParams } from 'react-router-dom';

const CatalogPagination = ({ collectionLength }) => {
    const [queryParams, setQueryParams] = useSearchParams();

    const pages = (length) => [...Array(Math.ceil(length / 20)).keys()];

    const clickHandler = (page) => {
        setQueryParams({ ...Object.fromEntries([...queryParams]), page });
    };

    return (
        pages(collectionLength).map((n) => {
            const pageNum = n + 1;

            return (
                <div key={pageNum} className="pagination-page-link" onClick={(e) => clickHandler(pageNum)} >
                    <div className="pagination-page-number">
                        {pageNum}
                    </div>
                </div>
            );
        })
    );
};

export default CatalogPagination;