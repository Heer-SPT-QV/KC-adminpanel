import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { API } from 'app/shared-components/API';
import { Typography } from '@material-ui/core';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState, setValue, watch, getValues } = methods;
	const { errors } = formState;
	const [productType, setProductType] = useState([]);
	const [allergySet, setAllergySet] = useState([]);
	const [ingridientSet, setIngridientSet] = useState([]);
	const [subtypeSet, setSubtypeSet] = useState([]);

	const productTypeWatch = watch('productType');
	const subtypeWatch = watch('subtype');
	const allergySetWatch = watch('allergySet');
	const ingredientSetWatch = watch('ingredientSet');

	// const storeInfo = watch('store');
	// const [address, setAddress] = useState(storeInfo.name);

	// const handlePlaceSelect = (data, placeId) => {
	// 	geocodeByAddress(data)
	// 		.then(results => getLatLng(results[0]))
	// 		.then(latLng => {
	// 			setValue('store', {
	// 				place_id: placeId,
	// 				name: data,
	// 				address: data,
	// 				latitude: latLng.lat,
	// 				longitude: latLng.lng
	// 			});
	// 			setAddress(data);
	// 		})
	// 		.catch(error => console.error('Error', error));
	// };

	useEffect(() => {
		axios
			.get(`${API}/subtype/all`)
			.then(response => {
				console.log(`sub type in product`, response.data);
				setSubtypeSet(response.data.body);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`${API}/productType/all`)
			.then(response => {
				setProductType(response.data.body);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`${API}/allergy/all`)
			.then(response => {
				setAllergySet(response.data.body);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);
	useEffect(() => {
		axios
			.get(`${API}/ingredient/all?searchName=&ascSort=true&pageSize=10000&pageNumber=1`)
			.then(response => {
				setIngridientSet(response.data.content);
			})
			.catch(error => {
				console.log(error);
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
						helperText={errors?.name?.message}
						label="English Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						required
					/>
				)}
			/>
			<Controller
				name="koreanName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.koreanName}
						helperText={errors?.koreanName?.message}
						label="Korean Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						required
					/>
				)}
			/>

			<Controller
				name="productType"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						id="productType"
						className="mt-8 mb-16"
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
			<Controller
				name="subtype"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						id="subtype"
						className="mt-8"
						options={subtypeSet}
						getOptionLabel={option => option?.name}
						style={{ width: 300 }}
						renderInput={params => (
							<TextField {...params} label="Sub Type" variant="outlined" />

							// <>
							// 	{getValues('subtype') === null ? (
							// 		<TextField {...params} label="Sub Type" variant="outlined" />
							// 	) : (
							// 		<TextField {...params} label="Sub Type" variant="outlined" />
							// 	)}
							// </>
						)}
						value={subtypeWatch}
						loadingText="Start Typing..."
						noOptionsText="No Options"
						onChange={(event, newValue) => {
							setValue('subtype', newValue);
						}}
					/>
				)}
			/>

			<Controller
				name="price"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-24 mb-16"
						error={!!errors.price}
						helperText={errors?.price?.message}
						label="Price"
						type="number"
						id="price"
						variant="outlined"
						fullWidth
						inputProps={{ min: 0 }}
						required
					/>
				)}
			/>
			<Controller
				name="priceUSD"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Price In USD"
						type="number"
						id="priceUSD"
						variant="outlined"
						fullWidth
						inputProps={{ min: 0 }}
					/>
				)}
			/>
			<Controller
				name="brand"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Brand"
						autoFocus
						id="brand"
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
						type="number"
						label="Cooking Time"
						id="cookingTime"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="cookingProcedure"
				control={control}
				render={({ field }) => (
					<TextField
						rows={5}
						multiline
						{...field}
						className="mt-8 mb-16"
						label="Cooking Procedure"
						id="cookingProcedure"
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
						type="number"
						label="Preparation Time"
						id="preparationTime"
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
						type="number"
						label="Report Count"
						id="reportCount"
						variant="outlined"
						fullWidth
						disabled
					/>
				)}
			/>

			<Controller
				name="allergySet"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						id="allergySet"
						options={allergySet}
						multiple
						getOptionLabel={option => option?.name}
						style={{ width: 300 }}
						renderInput={params => <TextField {...params} label="Allergy" variant="outlined" />}
						value={allergySetWatch}
						loadingText="Start Typing..."
						noOptionsText="No Options"
						onChange={(event, newValue) => {
							setValue('allergySet', newValue);
						}}
					/>
				)}
			/>

			<Controller
				name="ingredientSet"
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						id="ingredientSet"
						options={ingridientSet}
						multiple
						getOptionLabel={option => option?.name}
						style={{ width: 300, marginTop: 20 }}
						renderInput={params => <TextField {...params} label="Ingredient" variant="outlined" />}
						value={ingredientSetWatch}
						loadingText="Start Typing..."
						noOptionsText="No Options"
						onChange={(event, newValue) => {
							setValue('ingredientSet', newValue);
						}}
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						multiline
						rows={3}
						className="mt-8 mb-16"
						label="Description"
						id="description"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="disclaimer"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						multiline
						rows={3}
						className="mt-8 mb-16"
						label="Disclaimer"
						id="disclaimer"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			{/* <PlacesAutocomplete
				value={address}
				onChange={e => setAddress(e)}
				onSelect={handlePlaceSelect}
				searchOptions={{
					types: ['establishment']
				}}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<TextField
							fullWidth
							className="mt-8 mb-16"
							variant="outlined"
							placeholder="Search Places ..."
							label="Place"
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input'
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style
										})}
									>
										<ListItem>
											<ListItemText primary={suggestion.description} />
										</ListItem>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete> */}
		</div>
	);
}

export default BasicInfoTab;
