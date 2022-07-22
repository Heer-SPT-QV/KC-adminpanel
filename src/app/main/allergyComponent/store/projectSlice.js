import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/allergy?id=${params}`);
	const data = await response.data;
	return data.body;
	// return data === undefined ? null : data;
});

export const removeCategory = createAsyncThunk(
	'AllergyCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.delete(`${API}/allergy/delete?id=${id}`)
			.then(res => {
				toast.success(` Allergy deleted successfully   ${id}`);
			})
			.catch(() => {
				toast.error(`Cannot delete this allergy as it is associated to existing products `);
			});

		return id;
	}
);
export const productUser = createAsyncThunk('AllergyCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		iconUrl: productData.iconUrl
	};
	const res = await axios
		.patch(`${API}/allergy/update`, { ...proData })
		// .then(response => {
		// 	const { data } = response;
		// 	toast.success('Allergy Updated');
		// 	return { ...data };
		// })
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});

	return res.data;
});
export const saveCategory = createAsyncThunk('AllergyCommerceApp/product/saveProduct', async productData => {
	const proData = {
		name: productData.name,
		iconUrl: productData.iconUrl
	};
	const res = await axios.post(`${API}/allergy/add`, proData).catch(error => {
		console.log(error.message);
		toast.error(error.isAxiosError ? error.response.data.message : error.message);
	});
	return res.data;
});

const categorySlice = createSlice({
	name: 'AllergyCommerceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					iconUrl: '',
					imagePublicId: '',
					featuredImageId: ''
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
