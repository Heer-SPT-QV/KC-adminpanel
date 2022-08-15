import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { API } from 'app/shared-components/API';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState, setValue, watch, getValues } = methods;

	const { errors } = formState;
	const display = watch('display');
	const productTypeWatch = watch('productType');

	const [val, setVal] = useState('');
	const [productType, setProductType] = useState([]);
	const handleChange = e => {
		setVal(e.target.value);
	};
	console.log('val', val);
	useEffect(() => {
		axios
			.get(`${API}/productType/all`)
			.then(resp => {
				console.log('getProducttype', resp.data.body);
				setProductType(resp.data.body);
			})
			.catch(err => {
				console.log('err', err);
			});
	}, []);

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
				name="productType"
				control={control}
				render={({ field }) => (
					<FormControl
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Product Type"
						autoFocus
						id="productType"
						variant="outlined"
						value={val}
						fullWidth
					>
						<InputLabel id="demo-simple-select-label">Product Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={val}
							label="Select Product Type"
							onChange={handleChange}
						>
							{productType.map(({ name, id }) => (
								<MenuItem value={id}>{name}</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			/>  */}

			<Controller
				name="productType"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						id="productType"
						className="mt-8"
						options={productType}
						getOptionLabel={option => option?.name}
						style={{ width: 300 }}
						renderInput={params => (
							<>
								{getValues('productType') === null ? (
									<TextField {...params} label="Product Type" variant="outlined" required error />
								) : (
									<TextField {...params} label="Product Type" variant="outlined" required />
								)}
							</>
						)}
						value={productTypeWatch}
						loadingText="Start Typing..."
						noOptionsText="No Options"
						onChange={(event, newValue) => {
							setValue('productType', newValue);
						}}
					/>
				)}
			/>
			{getValues('productType') === null && (
				<p className="text-red-500 text-11 ml-14 mt-5">product type is a required field</p>
			)}
		</div>
	);
}

export default BasicInfoTab;
