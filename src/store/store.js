import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import favoritesReducer from '../features/userFavoritesSlice';
import cartReducer from '../features/userCartSlice';
import quickCartReducer from '../features/quickCartSlice';
import userAlertReducer from '../features/userAlertSlice';
export const store = configureStore({
  reducer: {
      user: userReducer,
      favorites: favoritesReducer,
      cart: cartReducer,
      quickCart: quickCartReducer,
      userAlert: userAlertReducer,
  },
})