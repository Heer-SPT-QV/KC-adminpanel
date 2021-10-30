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

	const [selectedFile, setSelectedFile] = useState([]);
	const [imageCred, setImageCred] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [myImages, setMyImages] = useState([]);
	const [changeImage, setChangeImage] = useState(false);
	// const [url, setUrl] = useState([]);

	const handleImageUpload = () => {
		setIsUploading(true);
		console.log(typeof selectedFile, 'type', selectedFile, selectedFile.length);
		const url = [];
		selectedFile.forEach(file => {
			const formData = new FormData();

			formData.append('file', file);
			axios
				.post(`${API}/file/image/upload?folderName=PRODUCT_IMAGES`, formData, {
					headers: {
						'content-type': 'multipart/form-data'
					}
				})
				.then(response => {
					// console.log(response.data.body,'image');
					setImageCred(old => [
						...old,
						{
							imageUrl: response.data.body.secureUrl,
							imagePublicId: response.data.body.public_id
						}
					]);
					url.push(response.data.body.secureUrl);
					// setValue('imageUrlList', response.data.body.secureUrl, { shouldDirty: true });
				})
				.catch(error => {
					setErrorMsg(error.isAxiosError ? error.response.data.message : error.message);
				})
				.finally(() => {
					setValue('imageUrlList', url);
					setIsUploading(false);
				});
		});
		console.log(url, 'cred');
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
									multiple
									id="image"
									type="file"
									onChange={async e => {
										const filesArr = Array.prototype.slice.call(e.target.files);
										setSelectedFile(filesArr);
										function readFileAsync(file) {
											return new Promise((resolve, reject) => {
												// const file = e.target.files;
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

										for (let i = 0; i < e.target.files.length; i += 1) {
											readFileAsync(e.target.files[i])
												.then(res => setMyImages(old => [...old, res]))
												.catch(err => console.error(err));

											// setMyImages(old => [...old, newImage]);
										}

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

			{!myImages.length && getValues('imageUrlList') && (
				<div style={{ display: 'flex' }}>
					{console.log(getValues('imageUrlList'), 'img')}

					{getValues('imageUrlList').map((item, index) => (
						<div
							role="button"
							tabIndex={0}
							className={clsx(
								classes.productImageItem,
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden  outline-none shadow hover:shadow-lg'
							)}
							onClick={() => setChangeImage(true)}
							onKeyDown={() => setChangeImage(true)}
							key={index}
						>
							<img className="max-w-none w-auto h-full" src={item} alt="product" />
						</div>
					))}
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
					disabled={selectedFile.length < 0 || imageCred.length < 0 || !!categoryIdWatch}
					startIcon={<Icon className="hidden sm:flex">backup</Icon>}
				>
					{isUploading ? <CircularProgress /> : imageCred.length > 0 ? 'Uploaded' : 'Upload'}
				</Button>
			)}
		</div>
	);
}

export default CategoryImagesTab;
