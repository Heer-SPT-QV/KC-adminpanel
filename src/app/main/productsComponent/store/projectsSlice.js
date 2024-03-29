import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { toast } from 'react-toastify';
import logger from 'redux-logger';

export const getCategories = createAsyncThunk('product', async ({ setTotalCat }) => {
	const response = await axios.get(`${API}/admin/product/all`);
	const data = await response.data;
	console.log(`data`, data);
	setTotalCat(response.data.body.length);
	return data.body;
});

export const removeCategoy = createAsyncThunk(
	'CategoryeCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		productIds.forEach(id => {
			axios
				.delete(`${API}/product?id=${id}`)
				.then(_res => toast.success(`deleted successfully ${id}`))
				.catch(() => {
					toast.error(`Error Deleting Product ${id}`);
				});
		});
		return productIds;
	}
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = categoriesAdapter.getSelectors(state => {
	return state.CategoryeCommerceApp.products;
});

const categoriesSlice = createSlice({
	name: 'CategoryeCommerceApp/products',
	initialState: categoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		toggleApprove: (state, action) => {
			return state;
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: categoriesAdapter.setAll,
		[removeCategoy.fulfilled]: (state, action) => categoriesAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText, toggleApprove } = categoriesSlice.actions;

export default categoriesSlice.reducer;
