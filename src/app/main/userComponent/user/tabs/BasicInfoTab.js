import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="firstName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.firstName}
						required
						helperText={errors?.firstName?.message}
						label="firstName"
						autoFocus
						id="firstName"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="lastName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="lastName"
						autoFocus
						id="lastName"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="email"
						autoFocus
						id="email"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			{/* <Controller
				name="allergySet"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.allergySet}
						required
						helperText={errors?.allergySet?.message}
						label="allergySet"
						autoFocus
						id="allergySet"
						variant="outlined"
						fullWidth
					/>
				)}
			/> */}
		</div>
	);
}

export default BasicInfoTab;
