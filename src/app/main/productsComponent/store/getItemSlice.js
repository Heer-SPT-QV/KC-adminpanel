import { createSlice } from '@reduxjs/toolkit';

export const getItemSlice = createSlice({
	name: 'getItem',
	initialState: {},
	reducers: {
		getItemFunc: (state, action) => {
			console.log('in toolkit', action.payload);
			return action.payload;
		}
	}
});

export const { getItemFunc } = getItemSlice.actions;

export default getItemSlice.reducer;
