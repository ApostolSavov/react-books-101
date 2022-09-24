import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookService from "../services/bookService";
import { filterHandler } from "../utils/helpers/bookFilter";

export const getAllBooks = createAsyncThunk(
    'books/getAllBooks',
    ({ abortController }) => {
        return BookService.getAll(abortController)
            .then(({ data }) => data)
            .catch(({ response }) => response);
    });

const initialState = { collection: [], modifiedCollection: [], isLoaded: false, error: null, filter: '', prevFilter: '', currentPage: 1 };

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        getFilteredBooks: (state, action) => {
            state.modifiedCollection = state.collection.filter((book) => filterHandler(book, action.payload));
        },
        changeFilter: (state, action) => {
            state.prevFilter = state.filter;
            state.filter = action.payload;
        },
        cancelLoading: (state) => {
            state = initialState;
        }
    },
    extraReducers: {
        [getAllBooks.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.collection = action.payload;
            state.modifiedCollection = action.payload;
        },
        [getAllBooks.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload;
        }
    }
});

export const { cancelLoading, changeFilter, getFilteredBooks } = booksSlice.actions;
export const { reducer } = booksSlice;