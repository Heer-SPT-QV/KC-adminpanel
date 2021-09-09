import { lazy } from 'react';

const productTypeConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/productTypes',
			exact: true,
			component: lazy(() => import('./productsType/productType'))
		},
		{
			path: '/productType/:productTypeId',
			exact: true,
			component: lazy(() => import('./productType/productType'))
		}
	]
};

export default productTypeConfig;
