import { createSlice } from '@reduxjs/toolkit';

export const getItemSlice = createSlice({
	name: 'getItem',
	initialState: {},
	reducers: {
		getItemFunc: (state, action) => {
			return action.payload;
		}
	}
});

export const { getItemFunc } = getItemSlice.actions;

export default getItemSlice.reducer;
