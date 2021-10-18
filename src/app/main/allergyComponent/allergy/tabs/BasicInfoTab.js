import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	// console.log(,"basic img");
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
			{/* <Controller
				name="iconUrl"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.iconUrl}
						required
						helperText={errors?.iconUrl?.message}
						label="Icon URL"
						autoFocus
						id="iconUrl"
						variant="outlined"
						fullWidth
						value={getValues('imageUrl')}
					/>
				)}
			/> */}
		</div>
	);
}

export default BasicInfoTab;
