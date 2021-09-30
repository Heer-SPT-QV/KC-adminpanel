import { combineReducers } from '@reduxjs/toolkit';
import products from './projectsSlice';
import product from './projectSlice';
import getItem from './getItemSlice';

const reducer = combineReducers({
	products,
	product,
	getItem
});

export default reducer;
