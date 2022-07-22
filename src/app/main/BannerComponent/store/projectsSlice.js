import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getCategories = createAsyncThunk('BannerCommerceApp', async ({ setTotalCat, page, rowsPerPage }) => {
	const response = await axios.get(`${API}/banner/all`);

	const data = await response;

	// setTotalCat(data.totalElements);
	return data.data.body;
});

export const removeCategoy = createAsyncThunk(
	'BannerCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		productIds.forEach(id => {
			axios
				.delete(`${API}/banner/${id}`)
				.then(() => {
					toast.success(`Banner deleted successfully ${id}`);
				})
				.catch(error => {
					console.log('err', error);
					toast.error(error.isAxiosError ? error.response.data.message : error.message);
					// toast.error(`Cannot delete this ingredient as it is associated to existing products`);
				});
		});
		return productIds;
	}
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = categoriesAdapter.getSelectors(state => {
	return state.BannerCommerceApp.products;
});

const categoriesSlice = createSlice({
	name: 'BannerCommerceApp/products',
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
