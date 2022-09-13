import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookService from "../services/bookService";

export const getAllBooks = createAsyncThunk(
    'books/getAllBooks',
    (controller) => {
        return BookService.getAll(controller)
            .then()
            .catch();
    });

const booksSlice = createSlice({
    name: "books",
    initialState: { books: [], isLoaded: false, error: null },
    reducers: {
        cancelLoading: (state) => {
            state.books = [];
            state.isLoaded = false;
            state.error = null;
        }
    },
    extraReducers: {
        [getAllBooks.pending]: (state, action) => {
        },
        [getAllBooks.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.books = action.payload.data;
        },
        [getAllBooks.rejected]: (state, action) => {
            state.isLoaded = true;
            state.error = action.payload.response;
        },
    }
});

export const { cancelLoading } = booksSlice.actions;
export const { reducer } = booksSlice;