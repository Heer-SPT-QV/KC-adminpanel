import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
// import ExampleConfig from 'app/main/example/ExampleConfig';
import projectComponentConfig from 'app/main/ingredientComponent/ingredientComponentConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import allergyComponentConfig from 'app/main/allergyComponent/allergyComponentConfig';
import userComponentConfig from 'app/main/userComponent/userComponentConfig';
import productTypeConfig from 'app/main/productTypeComponent/productTypeComponentConfig';
import productConfig from 'app/main/productsComponent/productComponentConfig';
import bannerComponentConfig from 'app/main/BannerComponent/bannerComponentConfig';
import subTypeComponentConfig from 'app/main/subTypeComponent/subTypeComponentConfig';
// import storeConfig from 'app/main';
// import storeConfig from 'app/main/storeComponent/shopComponentConfig';

const routeConfigs = [
	// ExampleConfig,
	projectComponentConfig,
	LoginConfig,
	allergyComponentConfig,
	userComponentConfig,
	productTypeConfig,
	productConfig,
	bannerComponentConfig,
	subTypeComponentConfig
	// storeConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff']),
	{
		path: '/',
		component: () => <Redirect to="/ingredients" />
	}
];

export default routes;
