import { authRoles } from 'app/auth';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			// {
			// 	id: 'example-component',
			// 	title: 'Example',
			// 	translate: 'EXAMPLE',
			// 	type: 'item',
			// 	icon: 'whatshot',
			// 	url: '/example'
			// },
			{
				id: 'ingredients',
				title: 'Ingredients',
				translate: 'Ingredients',
				type: 'item',
				icon: 'whatshot',
				url: '/ingredients'
			},
			{
				id: 'allergy',
				title: 'Allergy',
				translate: 'allergy',
				type: 'item',
				icon: 'whatshot',
				url: '/allergies'
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'users',
				type: 'item',
				icon: 'whatshot',
				url: '/users'
			},

			{
				id: 'productTypes',
				title: 'ProductTypes',
				translate: 'ProductTypes',
				type: 'item',
				icon: 'whatshot',
				url: '/productTypes'
			}

			// {
			// 	id: 'products',
			// 	title: 'Products',
			// 	translate: 'Products',
			// 	type: 'item',
			// 	icon: 'whatshot',
			// 	url: '/products'
			// },
			// {
			// 	id: 'stores',
			// 	title: 'Stores',
			// 	translate: 'Stores',
			// 	type: 'item',
			// 	icon: 'whatshot',
			// 	url: '/stores'
			// }
		]
	}
];

export default navigationConfig;
