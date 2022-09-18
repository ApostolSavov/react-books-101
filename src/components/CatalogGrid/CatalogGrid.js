import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, cancelLoading } from "../../slices/books";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import CatalogCard from "../CatalogCard/CatalogCard";

const CatalogGrid = () => {
    const { books, isLoaded, error, filter } = useSelector(({ books }) => books);
    const dispatch = useDispatch();
    const controller = new AbortController();

    const initFetch = (abortController) => dispatch(getAllBooks(abortController));

    const filterBooks = (book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();

        return (title.includes(filter) || author.includes(filter));
    };

    useEffect(() => {
        initFetch(controller);

        return () => {
            dispatch(cancelLoading());
            controller.abort();
        };
    }, []);

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
                    <div className="catalog-grid">
                        {books
                            .filter(filterBooks)
                            .map(({ id, title, author, imageLink }) => (
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