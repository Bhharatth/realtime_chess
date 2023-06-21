import { createSlice } from "@reduxjs/toolkit";

const selectedPlayerSlice = createSlice({
    name: "selectedPlayer",
    initialState: {
        currentPlayer: {
            _id: null,
            username: null,
            email: null,
            __v: 0,
        },
    },
    reducers: {

        setSelectedPlayers: (state, action) => {
            state.currentPlayer = action.payload;
        },

    },
});

export const { setSelectedPlayers } = selectedPlayerSlice.actions;
export default selectedPlayerSlice.reducer;