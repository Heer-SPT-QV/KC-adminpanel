import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import CategoriesHeader from './bannerHeader';
import CategoriesTable from './bannerTable';

function Categories() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CategoriesHeader />}
			content={<CategoriesTable />}
			innerScroll
		/>
	);
}

export default withReducer('BannerCommerceApp', reducer)(Categories);
