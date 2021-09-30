import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { API } from 'app/shared-components/API';
import { toast } from 'react-toastify';
import { Route, useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function CategoryImagesTab(props) {
	const history = useHistory();
	const classes = useStyles(props);
	const methods = useFormContext();
	const { control, watch, setValue, getValues } = methods;

	const images = watch('images', []);
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageCred, setImageCred] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [myImages, setMyImages] = useState([]);

	const handleImageUpload = () => {
		setIsUploading(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		axios
			.post(`${API}/ingredient/upload`, formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(response => {
				console.log(response);
				// setImageCred({
				// 	imageUrl: response.data.secure_url,
				// 	imagePublicId: response.data.public_id
				// });
				// setValue('imageUrl', response.data.secure_url);
				// setValue('imagePublicId', response.data.public_id);
			})
			.catch(error => {
				setErrorMsg(error.isAxiosError ? error.response.data.message : error.message);
			})
			.finally(() => {
				setIsUploading(false);
				toast.success('Ingredient successfully addedd');
				history.push('/ingredients');
			});
	};

	return (
		<div>
			<div className="flex flex-wrap justify-center -mx-16 sm:justify-start">
				{!props.isOldProduct && (
					<Controller
						name="images"
						control={control}
						render={({ field: { onChange, value } }) => (
							<label
								htmlFor="button-file"
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="csv/*"
									className="hidden"
									id="button-file"
									type="file"
									onChange={async e => {
										setSelectedFile(e.target.files[0]);
										function readFileAsync() {
											return new Promise((resolve, reject) => {
												const file = e.target.files[0];
												if (!file) {
													return;
												}
												const reader = new FileReader();

												reader.onload = () => {
													resolve({
														id: FuseUtils.generateGUID(),
														url: `data:${file.type};base64,${btoa(reader.result)}`,
														type: 'csv'
													});
												};

												reader.onerror = reject;

												reader.readAsBinaryString(file);
											});
										}

										const newImage = await readFileAsync();

										setMyImages([newImage]);
										// onChange([newImage]);
									}}
								/>
								<Icon fontSize="large" color="action">
									cloud_upload
								</Icon>
							</label>
						)}
					/>
				)}

				<Controller
					name="featuredImageId"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) =>
						myImages.map(media => (
							<div
								role="button"
								tabIndex={0}
								className={clsx(
									classes.productImageItem,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden  outline-none shadow hover:shadow-lg'
								)}
								key={media.id}
							>
								<img className="w-auto h-full max-w-none" src={media.url} alt="product" />
							</div>
						))
					}
				/>
			</div>
			{!myImages.length && getValues('imageUrl') && (
				<div
					role="button"
					tabIndex={0}
					className={clsx(
						classes.productImageItem,
						'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden  outline-none shadow hover:shadow-lg'
					)}
				>
					<img className="w-auto h-full max-w-none" src={getValues('imageUrl')} alt="product" />
				</div>
			)}
			<div style={{ margin: '10px 0' }}>
				<Typography variant="h6" color="error">
					{errorMsg || ''}
				</Typography>
			</div>

			{!props.isOldProduct && (
				<Button
					className="mx-4 whitespace-nowrap"
					variant="contained"
					color="secondary"
					onClick={handleImageUpload}
					disabled={!selectedFile || !!imageCred}
					startIcon={<Icon className="hidden sm:flex">backup</Icon>}
				>
					{isUploading ? <CircularProgress /> : imageCred !== null ? 'Uploaded' : 'Upload'}
				</Button>
			)}
		</div>
	);
}

export default CategoryImagesTab;
