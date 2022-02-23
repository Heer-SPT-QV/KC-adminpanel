import { Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const display = watch('display');

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
				name="display"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Display Sequence"
						autoFocus
						id="displaySequence"
						variant="outlined"
						type="number"
						fullWidth
					/>
				)}
			/> */}
			{/* <FormControlLabel
				control={
					<Checkbox
						checked={display}
						onChange={e => {
							
						}}
						name="Display"
					/>
				}
				label="display"
			/> */}
		</div>
	);
}

export default BasicInfoTab;
