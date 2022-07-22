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

function AllergyCsvTab(props) {
	const history = useHistory();
	const classes = useStyles(props);
	const methods = useFormContext();
	const { control, setValue, getValues } = methods;

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
			.post(`${API}/allergy/csv`, formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(response => {
				toast.success('Ingredient successfully addedd');
				history.push('/allergies');
			})
			.catch(error => {
				setErrorMsg(error.isAxiosError ? error.response.data.message : error.message);
			})
			.finally(() => {
				setIsUploading(false);
			});
	};

	return (
		<div>
			{!props.isOldProduct && (
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange, value } }) => (
						<label
							htmlFor="button-file"
							className={clsx(
								classes.productImageUpload,
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="csv/*"
								className="hidden"
								id="button-file"
								type="file"
								onChange={async e => {
									setSelectedFile(e.target.files[0]);
								}}
							/>
							<Icon fontSize="large" color="action">
								cloud_upload
							</Icon>
						</label>
					)}
				/>
			)}

			{selectedFile && (
				<Controller
					name="featuredImageId"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<>
							<p className="text-base mb-16">{selectedFile.name}</p>
						</>
					)}
				/>
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

export default AllergyCsvTab;
