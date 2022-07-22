import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from 'app/shared-components/API';
// import FuseUtils from '@fuse/utils';

export const getCategory = createAsyncThunk('BannerCommerceApp/product/getProduct', async params => {
	const response = await axios.get(`${API}/ingredient?id=${params}`);
	const data = await response.data;

	return data.body;
});

export const removeCategory = createAsyncThunk(
	'BannerCommerceApp/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().CategoryeCommerceApp.product;
		await axios
			.delete(`${API}/banner/${id}`)
			.then(res => {
				toast.success(`Successfully deleted ${id}`);
			})
			.catch(() => {
				toast.error(`Cannot delete this ingredient as it is associated to existing products`);
			});

		return id;
	}
);

export const productUser = createAsyncThunk('BannerCommerceApp/product/update', async productData => {
	const proData = {
		id: productData.id,
		name: productData.name,
		nameInHangul: productData.nameInHangul
	};

	axios
		.patch(`${API}/ingredient/update`, { ...proData })
		.then(response => {
			toast.success('Ingredient Updated');
			const { data } = response;
			return data.body;
		})
		.catch(error => {
			console.log('err', error);
			toast.error(error.isAxiosError ? error.response.data.message : error.message);
		});
});

export const saveCategory = createAsyncThunk('BannerCommerceApp/product/saveProduct', async productData => {
	const Prodata = {
		name: productData.name,
		url: productData.imageUrl,
		active: false
	};
	axios
		.post(`${API}/banner/add`, Prodata)
		.then(response => {
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
	name: 'BannerCommerceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					// id: FuseUtils.generateGUID(),
					name: '',
					imageUrl: ''
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
