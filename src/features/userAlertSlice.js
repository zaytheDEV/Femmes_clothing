import { createSlice } from '@reduxjs/toolkit'

const userAlertSlice = createSlice({
    name: 'userAlert',
    initialState: {
        active: false,
        alertMessage: '',
    },
    reducers: {
        alertUser(state, action) {
            state.active = true;
            state.alertMessage = action.payload;
        },
        hideAlert(state){
            state.active = false;
        }
    }
})

export const {alertUser, hideAlert} = userAlertSlice.actions;

export default userAlertSlice.reducer;