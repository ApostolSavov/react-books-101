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
    initialState: { books: [], isLoaded: false, error: null, filter: "" },
    reducers: {
        changeFilter: (state, action) => {
            console.log(action.payload);
            state.filter = action.payload;
        },
        cancelLoading: (state) => {
            state.books = [];
            state.isLoaded = false;
            state.error = null;
            state.filter = "";
        }
    },
    extraReducers: {
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

export const { cancelLoading, changeFilter } = booksSlice.actions;
export const { reducer } = booksSlice;