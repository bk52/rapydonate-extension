import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    checkoutId: '',
    donateId: '',
    message: '',
    status: '',
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckout: (state, action) => {
            const { checkoutId, donateId, message, status } = action.payload;
            state.checkoutId = checkoutId;
            state.status = status;
            state.donateId = donateId;
            state.message = message;
        }
    }
});
export const selectCheckout = (state) => state.checkout;
export const { setCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;