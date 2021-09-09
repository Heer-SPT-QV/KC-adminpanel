import { lazy } from 'react';

const storeConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/stores',
			exact: true,
			component: lazy(() => import('./Shops/store'))
		},
		{
			path: '/store/:storeId',
			exact: true,
			component: lazy(() => import('./Shop/store'))
		}
	]
};

export default storeConfig;
