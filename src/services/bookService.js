import http from '../utils/requestUtils/common';

const getAll = (controller) => {
    return http.get('/books', { signal: controller.signal });
};

const BookService = {
    getAll
};

export default BookService;