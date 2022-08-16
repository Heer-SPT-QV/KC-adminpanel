import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';

export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/admin/product?id=${params}`);
	const data = await response.data;
	return { ...data.body };
});

export const removeCategory = createAsyncThunk(
	'CategoryeCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.patch(`${API}/product/admin/approve_reject_product?productId=${id}`)
			.then(res => {
				toast.success(`${res.data.message}`);
			})
			.catch(() => {
				toast.error(`Error in approve/reject product ${id}`);
			});

		return id;
	}
);
export const productUser = createAsyncThunk('CategoryeCommerceApp/product/update', async ({ productData, history }) => {
	console.log('update prodData', productData);
	axios
		.patch(`${API}/product/update/new`, {
			...productData,
			cookingTime: Number(productData.cookingTime),
			preparationTime: Number(productData.preparationTime),
			price: Number(productData.price),
			// priceUSD: productData.priceUSD !== '' ? Number(productData.priceUSD) : '',
			reportCount: Number(productData.reportCount)
		})
		.then(response => {
			toast.success('Product Updated ');
			history.push('/products');
		})
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {
	const { id, featuredImageId, approved, ...allData } = productData;
	console.log('productData in product', productData);
	// axios

	// 	.post(`${API}/product/add`, {
	// 		...allData,
	// 		cookingTime: Number(allData.cookingTime),
	// 		preparationTime: Number(allData.preparationTime),
	// 		price: Number(allData.price),
	// 		priceUSD: allData.priceUSD && Number(allData.priceUSD),
	// 		reportCount: Number(allData.reportCount),
	// 		store: {
	// 			latitude: 17.4565312,
	// 			longitude: 78.4447536
	// 		}
	// 	})
	// 	.then(response => {
	// 		toast.success('Product Created');
	// 		return response.data;
	// 	})
	// 	.catch(error => {
	// 		console.log(error.message);
	// 		toast.error(error.isAxiosError ? error.response.data.message : error.message);
	// 	});
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
					KoreanName: '',
					cookingProcedure: '',
					cookingTime: '',
					preparationTime: '',
					price: '',
					priceUSD: '',
					reportCount: '',
					description: '',
					disclaimer: '',
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
					// subtype: {
					// 	id:
					// },
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
