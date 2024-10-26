import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Game } from '../interface/games';

interface GameState {
    gamesData: Game[];
    filteredGames: Game[];
    loading: boolean;
    error: string | null;
}

const initialState: GameState = {
    gamesData: [],
    filteredGames: [],
    loading: false,
    error: null,
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        fetchGamesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchGamesSuccess(state, action: PayloadAction<Game[]>) {
            state.loading = false;
            state.filteredGames = action.payload;
        },
        fetchGamesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setFilteredGames(state, action: PayloadAction<Game[]>) {
            state.filteredGames = action.payload;
        },
        setGamesData(state, action: PayloadAction<Game[]>) {
            state.filteredGames = action.payload;
        },
    },
});

export const { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, setFilteredGames, setGamesData } = gamesSlice.actions;

export default gamesSlice.reducer;
