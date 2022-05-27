import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    title: '',
    description: '',
    imageURL: '',
    donationTypes: [],
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => {
            const { _id, title, description, imageURL, donationTypes } = action.payload;
            state._id = _id;
            state.title = title;
            state.description = description;
            state.imageURL = imageURL;
            state.donationTypes = donationTypes;
        }
    }
});
export const selectProject = (state) => state.project;
export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;