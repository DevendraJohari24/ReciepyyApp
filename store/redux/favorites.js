import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favories",
  initialState: {
    ids: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.ids.includes(action.payload.id)) {
        if (action.payload.id !== undefined) {
          state.ids.push(action.payload.id);
          console.log("Add Fav");
          console.log(state.ids);
        }
      }
    },
    removeFavorite: (state, action) => {
      console.log("Remove Fav");
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
      console.log(state.ids);
    },
  },
});

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;

export default favoriteSlice.reducer;
