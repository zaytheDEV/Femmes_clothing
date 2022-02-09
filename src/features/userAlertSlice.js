import { createSlice } from '@reduxjs/toolkit'

const userAlertSlice = createSlice({
    name: 'userAlert',
    initialState: {
        active: false,
        alertMessage: '',
        alertType: '',
    },
    reducers: {
        alertUser(state, action) {
            state.active = true;
            state.alertMessage = action.payload.message;
            state.alertType = action.payload.type;
        },
        hideAlert(state){
            state.active = false;
        }
    }
})

export const {alertUser, hideAlert} = userAlertSlice.actions;

export default userAlertSlice.reducer;