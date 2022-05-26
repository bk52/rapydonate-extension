import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetLocalSettings, SetLocalSettings } from "../utilities/LocalSettings";
import PAGES from '../pages/Pages';
const initialState = {
    countryId: -1,
    countryCode: '',
    countryCurrency: '',
    userName: '',
    page: PAGES.Loading
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPage: (state, action) => {
            const { page } = action.payload;
            state.page = page;
        },
        setSettings: (state, action) => {
            const { countryId, countryCode, countryCurrency, userName } = action.payload;
            console.log(countryId, countryCode, countryCurrency, userName)
            state.countryId = countryId;
            state.countryCode = countryCode;
            state.countryCurrency = countryCurrency;
            state.userName = userName;
        }
    }
});
export const selectPage = (state) => state.app.page;
export const selectCountry = (state) => { state.app.countryId, state.app.countryCode, state.app.countryCurrency }
export const selectUsername = (state) => state.app.userName;
export const { setPage, setSettings } = appSlice.actions;
export default appSlice.reducer;