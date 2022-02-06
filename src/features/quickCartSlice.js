import { createSlice } from '@reduxjs/toolkit'

const quickCartSlice = createSlice({
    name: 'quickCart',
    initialState: {
        active: false,
    },
    reducers: {
        activateCart(state) {
            state.active = !state.active;
        }
    }
})

export const {activateCart} = quickCartSlice.actions;

export default quickCartSlice.reducer;