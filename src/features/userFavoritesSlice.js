import { createSlice } from "@reduxjs/toolkit";

const userFavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addToFav(state, action) {
      let newItem = action.payload;
      let existingItem = state.favorites.find((item) => item.id === newItem.id);
      if (existingItem) {
        return;
      }
      state.favorites.push(action.payload);
    },
    removeFav(state, action) {
      return {
        favorites: [
          ...state.favorites.filter((filter) => filter.id !== action.payload),
        ],
      };
    },
    setFav(state, action) {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    },
    resetFav(state) {
      state.favorites = [];
    },
  },
});

export const { addToFav, resetFav, setFav, removeFav } =
  userFavoritesSlice.actions;

export default userFavoritesSlice.reducer;
