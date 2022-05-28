import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import projectReducer from './projectSlice';
import checkoutReducer from './checkoutSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        project: projectReducer,
        checkout: checkoutReducer
    },
});
