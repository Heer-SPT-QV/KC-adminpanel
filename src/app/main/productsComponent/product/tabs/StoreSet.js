import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

function StoreSet(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const product = useSelector(({ CategoryeCommerceApp }) => CategoryeCommerceApp.product);
	console.log('IngredientSet', product.StoreSet);

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="contactNumber"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Contact Number"
						autoFocus
						id="contactNumber"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default StoreSet;
