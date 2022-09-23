import './CatalogFilter.scss';
import { changeFilter } from "../../slices/books";
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const CatalogFilter = () => {
    const [currentValue, setCurrentValue] = useState('');
    const filter = useSelector(({ books }) => books.filter);
    const dispatch = useDispatch();

    const debouncedFilterValue = useDebounce(currentValue, 600);

    useEffect(() => {
        dispatch(changeFilter(debouncedFilterValue));
    }, [debouncedFilterValue]);

    return (
        <div className='catalog-filter-wrapper'>
            <label className='catalog-filter-label' htmlFor="filter">Filter</label>
            <input onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} id="filter" name="filter" className='catalog-filter-input' type="search" placeholder="Enter filter word..." />
        </div>
    );
};

export default CatalogFilter;