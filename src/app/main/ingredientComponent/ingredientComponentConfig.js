import { lazy } from 'react';

const projectComponentConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/ingredients',
			exact: true,
			component: lazy(() => import('./ingredients/ingredient'))
		},
		{
			path: '/ingredient/:ingredientId',
			exact: true,
			component: lazy(() => import('./ingredient/ingredient'))
		}
	]
};

export default projectComponentConfig;
