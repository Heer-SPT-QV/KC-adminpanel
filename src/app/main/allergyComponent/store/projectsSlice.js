import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getCategories = createAsyncThunk('AllergyCommerceApp', async ({ setTotalCat, page, rowsPerPage }) => {
	const response = await axios.get(
		`${API}/allergy/admin/get_all_allergies?pageNumber=${page + 1}&pageSize=${rowsPerPage}`
	);
	const data = await response.data;
	setTotalCat(data.totalElements);

	return data.content;
	// return data.data.map(item => {
	// 	return { ...item, id: item._id };
	// });
});

export const removeCategoy = createAsyncThunk(
	'AllergyCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		productIds.forEach(id => {
			axios
				.delete(`${API}/allergy/delete?id=${id}`)
				.then(res => toast.success(`deleted successfully ${id}`))
				.catch(() => {
					toast.error(`Cannot delete this allergy as it is associated to existing products ${id}`);
				});
		});
		return productIds;
	}
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = categoriesAdapter.getSelectors(state => {
	return state.AllergyCommerceApp.products;
});

const categoriesSlice = createSlice({
	name: 'AllergyCommerceApp/products',
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
