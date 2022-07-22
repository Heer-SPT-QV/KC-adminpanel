import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/productType?id=${params}`);
	const data = await response.data;

	return data.body;
});

export const removeCategory = createAsyncThunk(
	'CategoryeCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.delete(`${API}/productType/delete?id=${id}`)
			.then(resp => {
				toast.success(`deleted successfully ${id}`);
			})
			.catch(() => {
				toast.error(`Error Deleting Category ${id}`);
			});

		return id;
	}
);

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {
	const Prodata = {
		name: productData.name
	};
	const res = await axios
		.post(`${API}/productType/add`, Prodata)
		// .then(response => {
		// 	toast.success('Category Created');
		// 	return response.data;
		// })
		.catch(error => {
			console.log(error.message);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});

	return res.data;
});

export const productUser = createAsyncThunk('CategoryeCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		displaySequence: productData.displaySequence
	};
	const res = await axios
		.patch(`${API}/productType/update`, { ...proData })
		// .then(response => {
		// 	toast.success('Product Type Updated');
		// 	const { data } = response;
		// 	return { ...data };
		// })
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});

	return res.data;
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
					imageUrl: '',
					imagePublicId: '',
					images: [],
					displaySequence: null
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
