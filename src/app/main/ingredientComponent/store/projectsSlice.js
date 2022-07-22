import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getCategories = createAsyncThunk('passegers', async ({ setTotalCat, page, rowsPerPage, searchText }) => {
	const response = await axios.get(
		`${API}/ingredient/all?searchName=${searchText}&ascSort=true&pageSize=${rowsPerPage}&pageNumber=${page + 1}`
	);
	const data = await response.data;
	setTotalCat(data.totalElements);

	return data.content;
	// return data.data.map(item => {
	// 	return { ...item, id: item._id };
	// });
});

export const removeCategory = createAsyncThunk(
	'CategoryeCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		productIds.forEach(id => {
			axios
				.delete(`${API}/ingredient/delete?id=${id}`)
				.then(resp => {
					toast.success(`Ingredient deleted successfully ${id}`);
				})
				.catch(error => {
					toast.error(error.isAxiosError ? error.response.data.message : error.message);
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
		[removeCategory.fulfilled]: (state, action) => categoriesAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
