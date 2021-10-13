import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	console.log(control);

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
				name="cookingTime"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.cookingTime}
						required
						helperText={errors?.cookingTime?.message}
						label="Cooking Time"
						autoFocus
						id="iconURL"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="preparationTime"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.preparationTime}
						required
						helperText={errors?.preparationTime?.message}
						label="Preparation Time"
						autoFocus
						id="iconURL"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="price"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.price}
						required
						helperText={errors?.price?.message}
						label="Price"
						autoFocus
						id="iconURL"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="reportCount"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.reportCount}
						required
						helperText={errors?.reportCount?.message}
						label="Report Count"
						autoFocus
						id="iconURL"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.description}
						required
						helperText={errors?.description?.message}
						label="Description"
						autoFocus
						id="description"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
