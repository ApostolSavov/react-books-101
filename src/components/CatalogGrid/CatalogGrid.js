import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import CatalogCard from "../CatalogCard/CatalogCard";
import { getAllBooks, getFilteredBooks, cancelLoading } from "../../slices/books";

const CatalogGrid = () => {
    const { modifiedCollection, isLoaded, error, filter } = useSelector(({ books }) => books);
    const dispatch = useDispatch();
    const [queryParams, setQueryParams] = useSearchParams();
    const location = useLocation();
    const pageNumber = queryParams.get('page');
    const controller = new AbortController();

    const pages = (length) => [...Array(Math.ceil(length / 20)).keys()];

    const getAllBooksHandler = (abortController) => dispatch(getAllBooks({ abortController }));
    const getFilteredBooksHandler = (filter) => dispatch(getFilteredBooks(filter));

    const paginationSlice = (array, page, limit = 20) => {
        page = page ? page : 1;

        return array.slice((page - 1) * limit, page * limit);
    };

    console.log("render 0");

    useEffect(() => {
        console.log("render 1");

        getAllBooksHandler(controller);
        return () => {
            dispatch(cancelLoading());
            controller.abort();
        };
    }, []);

    useEffect(() => {
        getFilteredBooksHandler(filter);
    }, [filter]);

    useEffect(() => {
        if (filter) {
            if (pages(modifiedCollection.length).length < queryParams.get('page')) {
                queryParams.set('page', '1');
            }
            setQueryParams(queryParams, { replace: true });
        }

    }, [modifiedCollection.length]);

    return (
        <div className="catalog-grid-wrapper">
            {!isLoaded &&
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
                    <>
                        <div className="catalog-grid">
                            {paginationSlice(modifiedCollection, pageNumber)
                                .map(({ id, title, author, imageLink }) => (
                                    <CatalogCard
                                        key={id}
                                        id={id}
                                        title={title}
                                        author={author}
                                        imgSrc={imageLink} />))}
                        </div>
                        <div className="pagination-ribbon">
                            {pages(modifiedCollection.length).map((n) => {
                                const pageNum = n + 1;
                                return (
                                    <Link key={pageNum} className="pagination-page-link" to={`/catalog?page=${pageNum}`} >
                                        <div className="pagination-page-number">
                                            {pageNum}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
            }
        </div>
    );
};

export default CatalogGrid;