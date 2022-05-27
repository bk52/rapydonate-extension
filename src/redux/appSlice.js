import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetLocalSettings, SetLocalSettings } from "../utilities/LocalSettings";
import PAGES from '../pages/Pages';
const initialState = {
    countryId: -1,
    countryCode: '',
    countryCurrency: '',
    username: '',
    page: PAGES.Info
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
            const { countryId, countryCode, countryCurrency, username } = action.payload;
            state.countryId = countryId;
            state.countryCode = countryCode;
            state.countryCurrency = countryCurrency;
            state.username = username;
        }
    }
});

export const selectPage = (state) => state.app.page;
export const selectCountry = (state) => ({ countryId: state.app.countryId, countryCode: state.app.countryCode, countryCurrency: state.app.countryCurrency })
export const selectUsername = (state) => state.app.username;
export const { setPage, setSettings } = appSlice.actions;
export default appSlice.reducer;