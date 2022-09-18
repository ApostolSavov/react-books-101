import './CatalogFilter.scss';
import { changeFilter } from "../../slices/books";
import { useDispatch, useSelector } from "react-redux";

const CatalogFilter = () => {
    const filter = useSelector(({ books }) => books.filter);
    const dispatch = useDispatch();

    const onFilterChange = (e) => {
        dispatch(changeFilter(e.target.value));
    };

    return (
        <div className='catalog-filter-wrapper'>
            <label className='catalog-filter-label' htmlFor="filter">Filter</label>
            <input onChange={(e) => onFilterChange(e)} value={filter} id="filter" name="filter" className='catalog-filter-input' type="search" placeholder="Enter filter word..." />
        </div>
    );
};

export default CatalogFilter;