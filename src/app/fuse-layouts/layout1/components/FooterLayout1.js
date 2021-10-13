import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 shadow-md', props.className)}
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
			>
				{/* <Toolbar className="flex items-center px-8 py-0 overflow-x-auto min-h-48 md:min-h-64 sm:px-12">
					<Typography>Footer</Typography>
				</Toolbar> */}
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
