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
import { useHistory, withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { API } from 'app/shared-components/API';
import { getCategories, selectProducts, toggleApprove } from '../store/projectsSlice';
import { getSingle } from '../store/projectSlice';
import CategoriesTableHead from './productTableHead';
import { getItemFunc } from '../store/getItemSlice';
// import getItem  from '../store/getItemSlice';

function CategoriesTable(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const searchText = useSelector(({ CategoryeCommerceApp }) => CategoryeCommerceApp.products.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [totalCat, setTotalCat] = useState(0);

	useEffect(() => {
		dispatch(getCategories({ setTotalCat, page, rowsPerPage })).then(() => setLoading(false));
	}, [dispatch, page, rowsPerPage]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData([...products]);
		}
	}, [products, searchText]);

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

	function handleApproveClick(id) {
		axios
			.patch(`${API}/product/admin/approve_reject_product?productId=${id}`)
			.then(resp => {
				dispatch(toggleApprove());
			})
			.catch(err => {
				console.log(err);
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
		console.log('product item ', item);
		dispatch(getItemFunc(item));
		props.history.push(`/product/${item.id}`);
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
		console.log('running', value);
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		console.log('event', event.target.value);
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex items-center justify-center flex-1 h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no Products!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<CategoriesTableHead
						selectedProductIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
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
									onClick={event => handleClick(n)}
								>
									<TableCell className="w-40 text-center md:w-64" padding="none">
										<Checkbox
											checked={isSelected}
											onClick={event => event.stopPropagation()}
											onChange={event => handleCheck(event, n.id)}
										/>
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{/* <div style={{ backgroundColor: "white", width: "100px", height: "100px", zIndex: "100" }}>
											<input type="checkbox" checked style={{ zIndex: "1" }} />
										</div> */}
										<Checkbox
											onChange={() => handleApproveClick(n.id)}
											checked={n.approved}
											onClick={event => event.stopPropagation()}
											// onChange={event => handleCheck(event, n.id)}
										/>

										{/* {n.approved ? <Button>Reject</Button> : <Button>Approve</Button>} */}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.reportCount}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.price}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.productType.name}
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

export default withRouter(CategoriesTable);
