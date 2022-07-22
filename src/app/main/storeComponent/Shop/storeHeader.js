import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { productUser, removeCategory, saveCategory } from '../store/projectSlice';

function CategoryHeader(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const images = watch('images', []);
	const featuredImageId = watch('featuredImageId');
	const name = watch('name');
	const theme = useTheme();
	const history = useHistory();

	function handleSaveProduct() {
		dispatch(saveCategory(getValues()));
		reset(getValues());
	}

	function handleRemoveProduct() {
		dispatch(removeCategory()).then(() => {
			history.push('/allergies');
		});
	}

	function handleUpdateProduct() {
		dispatch(productUser(getValues()));
	}

	return (
		<div className="flex items-center justify-between flex-1 w-full">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/allergies"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden mx-4 font-medium sm:flex">Products</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						<img
							className="w-32 rounded sm:w-48"
							src={getValues().imageUrl || 'assets/images/ecommerce/product-image-placeholder.png'}
							alt={name}
						/>
					</motion.div>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="font-semibold truncate text-16 sm:text-20">
								{name || 'New Product'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Products Detail
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="mx-4 whitespace-nowrap"
					variant="contained"
					color="secondary"
					onClick={() => handleRemoveProduct()}
					startIcon={<Icon className="hidden sm:flex">delete</Icon>}
				>
					Remove
				</Button>
				{!props.isOldProduct ? (
					<Button
						className="mx-4 whitespace-nowrap"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={() => handleSaveProduct()}
					>
						Save
					</Button>
				) : (
					<Button
						className="mx-4 whitespace-nowrap"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={() => handleUpdateProduct()}
					>
						Update
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default CategoryHeader;
