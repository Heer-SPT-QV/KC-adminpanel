import { lazy } from 'react';

const allergyComponentConfig = {
	settings: {
		layout: {}
	},

	routes: [
		{
			path: '/allergies',
			exact: true,
			component: lazy(() => import('./allergies/allergy'))
		},
		{
			path: '/allergy/:allergyId',
			exact: true,
			component: lazy(() => import('./allergy/allergy'))
		}
	]
};

export default allergyComponentConfig;
