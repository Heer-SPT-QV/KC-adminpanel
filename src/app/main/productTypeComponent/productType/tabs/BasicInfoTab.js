import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

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
				name="nameInHangul"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.nameInHangul}
						required
						helperText={errors?.nameInHangul?.message}
						label="Name in Hangul"
						autoFocus
						id="nameInHangul"
						variant="outlined"
						fullWidth
					/>
				)}
			/> */}
		</div>
	);
}

export default BasicInfoTab;
