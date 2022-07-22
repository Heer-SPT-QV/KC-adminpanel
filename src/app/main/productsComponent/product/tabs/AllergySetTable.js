import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import AllergySetTableHead from './AllergySetTableHead';
// import getItem  from '../store/getItemSlice';

function AllerySetTable(props) {
	const dispatch = useDispatch();

	const product = useSelector(({ CategoryeCommerceApp }) => CategoryeCommerceApp.product);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(product?.allergySet || []);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [totalCat, setTotalCat] = useState(0);

	// useEffect(() => {
	// 	dispatch(getCategories({ setTotalCat, page, rowsPerPage })).then(() => setLoading(false));
	// }, [dispatch, page, rowsPerPage]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData([...products]);
	// 	}
	// }, [products, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/allergy/${item.id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	// if (loading) {
	// 	return <FuseLoading />;
	// }

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex items-center justify-center flex-1 h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no categories!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<AllergySetTableHead
						selectedProductIds={selected}
						order={order}
						onSelectAllClick={() => handleSelectAllClick}
						onRequestSort={() => handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={() => handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						).map(n => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="cursor-pointer h-72"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
									// onClick={event => handleClick(n)}
								>
									{/* <TableCell className="w-40 text-center md:w-64" padding="none">
										<Checkbox
											checked={isSelected}
											onClick={event => event.stopPropagation()}
											onChange={event => handleCheck(event, n.id)}
										/>
									</TableCell> */}

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.approved ? 'true' : 'false'}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.reportCount}
									</TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>
									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.iconUrl}
									</TableCell> */}
									<TableCell>
										{n.iconUrl.length ? (
											<img
												// className="block rounded w-50"
												className="h-32 w-52"
												// src={_.find(n.images, { id: n.featuredImageId }).url}
												src={n.iconUrl}
												alt={n.name}
											/>
										) : (
											<img
												className="block w-full rounded"
												src="assets/images/ecommerce/product-image-placeholder.png"
												alt={n.name}
											/>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={totalCat}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(AllerySetTable);
