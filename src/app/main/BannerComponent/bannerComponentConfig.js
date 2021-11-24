import { lazy } from 'react';

const bannerComponentConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/banners',
			exact: true,
			component: lazy(() => import('./Banners/banner'))
		},
		{
			path: '/banner/:bannerId',
			exact: true,
			component: lazy(() => import('./Banner/banner'))
		}
	]
};

export default bannerComponentConfig;
