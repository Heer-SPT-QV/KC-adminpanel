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
import { useHistory } from 'react-router';

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
	const classes = useStyles(props);
	const methods = useFormContext();
	const { control, watch, setValue, getValues } = methods;
	const categoryIdWatch = watch('categoryId');

	const [selectedFile, setSelectedFile] = useState(null);
	const [imageCred, setImageCred] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [myImages, setMyImages] = useState([]);
	const [changeImage, setChangeImage] = useState(false);

	const handleImageUpload = () => {
		setIsUploading(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		axios
			.post(`${API}/file/image/upload?folderName=PROFILE_PICTURE`, formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(response => {
				// console.log(response.data.body,'image');
				setImageCred({
					imageUrl: response.data.body.secureUrl,
					imagePublicId: response.data.body.public_id
				});
				setValue('iconUrl', response.data.body.secureUrl);
				setValue('imagePublicId', response.data.public_id);
				setValue('featuredImageId', response.data.body.secureUrl);
			})
			.catch(error => {
				setErrorMsg(error.isAxiosError ? error.response.data.message : error.message);
			})
			.finally(() => setIsUploading(false));
	};

	return (
		<div>
			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				{(!props.isOldProduct || changeImage) && (
					<Controller
						name="image"
						control={control}
						render={({ field: { onChange, value } }) => (
							<label
								htmlFor="image"
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="image/*"
									className="hidden"
									id="image"
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
														type: 'image'
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
								<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
							</div>
						))
					}
				/>
			</div>
			{!myImages.length && getValues('iconUrl') && (
				<div
					role="button"
					tabIndex={0}
					className={clsx(
						classes.productImageItem,
						'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden  outline-none shadow hover:shadow-lg'
					)}
					onClick={() => setChangeImage(true)}
					onKeyDown={() => setChangeImage(true)}
				>
					<img className="max-w-none w-auto h-full" src={getValues('iconUrl')} alt="product" />
				</div>
			)}
			<div style={{ margin: '10px 0' }}>
				<Typography variant="h6" color="error">
					{errorMsg || ''}
				</Typography>
			</div>

			{(!props.isOldProduct || changeImage) && (
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					onClick={handleImageUpload}
					disabled={!selectedFile || !!imageCred || !!categoryIdWatch}
					startIcon={<Icon className="hidden sm:flex">backup</Icon>}
				>
					{isUploading ? <CircularProgress /> : imageCred !== null ? 'Uploaded' : 'Upload'}
				</Button>
			)}
		</div>
	);
}

export default CategoryImagesTab;
