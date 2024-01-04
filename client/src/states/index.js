// gamesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        gamesData: [],
        filteredGames: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchGamesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchGamesSuccess(state, action) {
            state.loading = false;
            state.gamesData = action.payload;
            state.filteredGames = action.payload;
        },
        fetchGamesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setFilteredGames(state, action) {
            state.filteredGames = action.payload;
        },
    },
});

export const { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, setFilteredGames } = gamesSlice.actions;

export default gamesSlice.reducer;
