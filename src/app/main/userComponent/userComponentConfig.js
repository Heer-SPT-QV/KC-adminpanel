import { lazy } from 'react';

const userComponentConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/users',
			exact: true,
			component: lazy(() => import('./users/user'))
		},
		{
			path: '/user/:userId',
			exact: true,
			component: lazy(() => import('./user/user'))
		}
	]
};

export default userComponentConfig;
