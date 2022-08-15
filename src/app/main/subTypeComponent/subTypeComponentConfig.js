import { lazy } from 'react';

const productTypeConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/subTypes',
			exact: true,
			component: lazy(() => import('./subsType/subType'))
		},
		{
			path: '/subType/:subTypeId',
			exact: true,
			component: lazy(() => import('./subType/subType'))
		}
	]
};

export default productTypeConfig;
