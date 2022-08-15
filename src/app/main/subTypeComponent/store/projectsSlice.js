import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getCategories = createAsyncThunk('passegers', async ({ setTotalCat, page, rowsPerPage }) => {
	const response = await axios.get(`${API}/subtype/all`);
	const data = await response.data;
	console.log(data)
	// setTotalCat(data.totalPages);

	return data.body;
});

export const removeCategoy = createAsyncThunk(
	'CategoryeCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		productIds.forEach(id => {
			axios
				.delete(`${API}/productType/delete?id=${id}`)
				.then(resp => {
					toast.success(`productType deleted Successfully ${id}`);
				})
				.catch(() => {
					toast.error(`Error Deleting Category ${id}`);
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
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: categoriesAdapter.setAll,
		[removeCategoy.fulfilled]: (state, action) => categoriesAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
