import { createSlice } from "@reduxjs/toolkit";

const selectedPlayerSlice = createSlice({
    name: "selectedPlayer",
    initialState: {
        selectedPlayer: {
            _id: null,
            username: null,
            email: null,
            __v: 0
        },
    },
    reducers: {

        setSelectedPlayers: (state, action) => {
            state.selectedPlayer = action.payload;
        },

    },
});

export const { setSelectedPlayers } = selectedPlayerSlice.actions;
export default selectedPlayerSlice.reducer;