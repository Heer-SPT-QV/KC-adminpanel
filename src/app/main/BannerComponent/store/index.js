import { combineReducers } from '@reduxjs/toolkit';
import products from './projectsSlice';
import product from './projectSlice';

const reducer = combineReducers({
	products,
	product
});

export default reducer;
