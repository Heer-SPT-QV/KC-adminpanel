import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/admin/product?id=${params}`);
	const data = await response.data;
	console.log(data.body.storeSet[0]);
	return { ...data.body, store: data.body.storeSet[0] };
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
	axios
		.patch(`${API}/product/update`, { ...productData })
		.then(response => {
			toast.success('Product Updated ');
			const { data } = response;
			return { ...data.body };
		})
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {
	const { id, featuredImageId, approved, ...allData } = productData;
	axios

		.post(`${API}/product/add`, {
			...allData,
			cookingTime: Number(allData.cookingTime),
			preparationTime: Number(allData.preparationTime),
			price: Number(allData.price),
			reportCount: Number(allData.reportCount)
		})
		.then(response => {
			toast.success('Product Created');
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
					cookingProcedure: '',
					cookingTime: '',
					preparationTime: '',
					price: '',
					reportCount: '',
					description: '',
					approved: true,
					store: {
						place_id: '',
						name: '',
						latitude: '',
						longitude: '',
						address: '',
						contactNumber: '9090909090',
						imageUrl:
							'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
					},
					productType: {
						id: null,
						name: ''
					},
					imageUrlList: [],
					allergySet: [],
					ingredientSet: []
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
