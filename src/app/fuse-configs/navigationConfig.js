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
		title: '',
		translate: '',
		type: 'group',
		icon: '',
		children: [
			{
				id: 'ingredients',
				title: 'Ingredients',
				translate: 'Ingredients',
				type: 'item',
				icon: 'grain',
				url: '/ingredients'
			},
			{
				id: 'allergy',
				title: 'Allergy',
				translate: 'Allergy',
				type: 'item',
				icon: 'whatshot',
				url: '/allergies'
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				icon: 'people',
				url: '/users'
			},

			{
				id: 'productTypes',
				title: 'ProductTypes',
				translate: 'Product Types',
				type: 'item',
				icon: 'category',
				url: '/productTypes'
			},

			{
				id: 'products',
				title: 'Products',
				translate: 'Products',
				type: 'item',
				icon: 'whatshot',
				url: '/products'
			},
			{
				id: 'banners',
				title: 'Banners',
				translate: 'Banners',
				type: 'item',
				icon: 'collections',
				url: '/banners'
			}
		]
	}
];

export default navigationConfig;
