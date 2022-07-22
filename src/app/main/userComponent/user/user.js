import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store';
import { getCategory, newProduct, resetProduct } from '../store/projectSlice';
import CategoryHeader from './userHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import CategoryImagesTab from './tabs/CategoryImagesTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a category name')
		.min(3, 'The category name must be at least 3 characters')
});

function Category(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ CategoryeCommerceApp }) => CategoryeCommerceApp.product);

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noProduct, setNoProduct] = useState(false);
	const [isOldProduct, setIsOldProduct] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { userId } = routeParams;

			if (userId === 'new') {
				/**
				 * Create New Product data
				 */
				dispatch(newProduct());
			} else {
				/**
				 * Get Product data
				 */
				dispatch(getCategory(userId)).then(action => {
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoProduct(true);
					} else {
						setIsOldProduct(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!product) {
			return;
		}
		/**
		 * Reset the form on product state changes
		 */
		reset(product);
	}, [product, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Product on component unload
			 */
			dispatch(resetProduct());
			setNoProduct(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
	}

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noProduct) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col items-center justify-center flex-1 h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such category!
				</Typography>
				<Button className="mt-24" component={Link} variant="outlined" to="/category" color="inherit">
					Go to Category Page
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (_.isEmpty(form)) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<CategoryHeader isOldProduct={isOldProduct} />}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={() => handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab className="h-64" label="Basic Info" />
					</Tabs>
				}
				content={
					<div className="max-w-2xl p-16 sm:p-24">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab isOldProduct={isOldProduct} />
							{/* <CategoryImagesTab isOldProduct={isOldProduct} /> */}
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('CategoryeCommerceApp', reducer)(Category);
