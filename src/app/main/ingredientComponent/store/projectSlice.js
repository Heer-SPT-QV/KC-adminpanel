import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/ingredient?id=${params}`);
	const data = await response.data;

	// return data === undefined ? null : data;
	return data.body;
});

export const removeCategory = createAsyncThunk(
	'CategoryeCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.delete(`${API}/ingredient/delete?id=${id}`)
			.then(res => {
				toast.success(`Successfully deleted ${id}`);
			})
			.catch(() => {
				toast.error(`Cannot delete this ingredient as it is associated to existing products`);
			});

		return id;
	}
);

export const productUser = createAsyncThunk('CategoryeCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		nameInHangul: productData.nameInHangul
	};

	const response = await axios.patch(`${API}/ingredient/update`, { ...proData }).catch(error => {
		toast.error(error.isAxiosError ? error.response.data.message : error.message);
	});

	return response.data;
});

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {
	const Prodata = {
		name: productData.name,
		nameInHangul: productData.nameInHangul
	};

	const response = await axios.post(`${API}/ingredient/add`, Prodata).catch(error => {
		toast.error(error.isAxiosError ? error.response.data.error : error.message);
	});
	return response.data;
});

const categorySlice = createSlice({
	name: 'CategoryeCommerceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					nameInHangul: '',
					imageUrl: '',
					imagePublicId: '',
					images: []
				}
			})
		}
	},
	extraReducers: {
		[getCategory.fulfilled]: (state, action) => action.payload,
		[saveCategory.fulfilled]: (state, action) => action.payload,
		[removeCategory.fulfilled]: (state, action) => null
	}
});

export const { newProduct, resetProduct } = categorySlice.actions;

export default categorySlice.reducer;
