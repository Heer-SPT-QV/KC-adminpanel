import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';


export const getCategory = createAsyncThunk('CategoryeCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/ingredient?id=${params}`);
	const data = await response.data;
	// console.log(data);

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

export const productUser = createAsyncThunk('UsersCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		nameInHangul: productData.nameInHangul
	};
	console.log('proData', proData);
	axios
		.patch(`${API}/ingredient/update`, { ...proData })
		.then(response => {
			// console.log('upadted ingr', response);
			toast.success('Ingredient Updated');
			const { data } = response;
			return data.body;
		})
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

export const saveCategory = createAsyncThunk('CategoryeCommerceApp/product/saveProduct', async productData => {

	const Prodata = {
		name: productData.name,
		url:productData.imageUrl,
		active:false
	};
	console.log('banner post data', productData);
	axios
		.post(`${API}/banner/add`, Prodata)
		.then(response => {
			console.log("banner data in axios",response);
			toast.success('New banner added successfully ');
			// history.push("/banners")
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
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					// id: FuseUtils.generateGUID(),
					name: '',
					imageUrl: '',
					// imagePublicId: '',
					// images: []
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