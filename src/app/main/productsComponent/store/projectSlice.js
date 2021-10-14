import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/admin/product?id=${params}`);
	const data = await response.data;
	// console.log(data.body);
	return data.body;
	// return data === undefined ? null : data;
});

export const removeCategory = createAsyncThunk(
	'CategoryeCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.delete(`${API}/product?id=${id}`)
			.then(res => {
				toast.success(`deleted successfully   ${id}`);
			})
			.catch(() => {
				toast.error(`Error Deleting Category ${id}`);
			});

		return id;
	}
);
export const productUser = createAsyncThunk('UsersCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		iconUrl: productData.iconUrl
	};
	axios
		.patch(`${API}/product/update`, { ...proData })
		.then(response => {
			toast.success('User Updated');
			const { data } = response;
			return { ...data };
		})
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {
	const Prodata = {
		name: productData.name,
		iconUrl: productData.iconURL
	};
	axios
		.post(`${API}/allergy/add`, Prodata)
		.then(response => {
			console.log(response);
			toast.success('Category Created');
			return response.data;
		})
		.catch(error => {
			console.log(error.message);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

const categorySlice = createSlice({
	name: 'CategoryeCommerceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		// getSingle:(state,action)=>{
		// 	console.log("in toolkit",action.payload);
		// 	return action.payload;
		// },
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					approved: true,
					description: ''
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

export const { newProduct, resetProduct, getSingle } = categorySlice.actions;

export default categorySlice.reducer;
