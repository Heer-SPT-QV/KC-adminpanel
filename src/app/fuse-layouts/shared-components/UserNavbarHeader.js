import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		background: theme.palette.background.default,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		bottom: 0,
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);

	const classes = useStyles();

	return (
		<AppBar
			position="static"
			color="primary"
			classes={{ root: classes.root }}
			className="relative z-0 flex flex-col items-center justify-center pt-24 pb-64 mb-32 user shadow-0"
		>
			<Typography className="mb-4 font-semibold username text-18 whitespace-nowrap" color="inherit">
				{user.data.displayName}
			</Typography>
			<Typography className="font-medium opacity-50 email text-13 whitespace-nowrap" color="inherit">
				{user.data.email}
			</Typography>
			<div className="absolute bottom-0 flex items-center justify-center -mb-44">
				{/* <Avatar
					className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')}
					alt="user photo"
					src={
						user.data.photoURL && user.data.photoURL !== ''
							? user.data.photoURL
							: 'assets/images/avatars/profile.jpg'
					}
				/> */}
			</div>
		</AppBar>
	);
}

export default UserNavbarHeader;
