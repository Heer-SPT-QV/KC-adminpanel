/* eslint-disable react-hooks/exhaustive-deps */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../../shared-components/API';
import { getCategories, selectProducts } from '../store/projectsSlice';
import CategoriesTableHead from './subTypeTableHead';

function CategoriesTable(props) {
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
		dispatch(getCategories({ setTotalCat, page, rowsPerPage })).then(res => {
			setLoading(false);
			setData(res.payload);
		});
	}, [dispatch, page, rowsPerPage]);

	useEffect(() => {
		if (searchText.length !== 0) {
			console.log('src data', data);
			setData(
				_.filter(products, item => item.productType?.name.toLowerCase().includes(searchText.toLowerCase()))
			);
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
		props.history.push(`/subType/${item.id}`);
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

	const handleChange = (event, id) => {
		axios
			.patch(`${API}/productType/update`, { id, display: event.target.checked })
			.then(response => {
				toast.success('product type updated');
				const index = data.findIndex(d => d.id === response.data.body.id);
				data[index] = response.data.body;
				props.history.push('/productTypes');
			})
			.catch(error => {
				console.log('err', error);
				toast.error(error.isAxiosError ? error.response.data.message : error.message);
			});
	};

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
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
					There are no Sub Type!
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
											return o.name;
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
										{n.productType?.name}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										<Checkbox
											checked={n.display}
											onClick={event => event.stopPropagation()}
											onChange={event => handleChange(event, n.id)}
										/>
									</TableCell>
									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.nameInHangul}
									</TableCell> */}
									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.airlin.name || ''}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.airline[0]?.country || ''}
									</TableCell> */}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			{/* 
			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={totalCat}
				// rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/> */}
		</div>
	);
}

export default withRouter(CategoriesTable);
