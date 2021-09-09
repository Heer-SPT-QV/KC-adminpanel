import { lazy } from 'react';

const productConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/products',
			exact: true,
			component: lazy(() => import('./products/product'))
		},
		{
			path: '/product/:productId',
			exact: true,
			component: lazy(() => import('./product/product'))
		}
	]
};

export default productConfig;
