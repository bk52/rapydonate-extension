import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import projectReducer from './projectSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        project: projectReducer
    },
});
