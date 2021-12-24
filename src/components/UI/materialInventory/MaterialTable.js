import React from 'react';
import EditMaterial from '../../section/inventory/EditMaterial';
import CustomModal from '../utility/CustomModal';
import OffCanvas from '../utility/OffCanvas';

function MaterialTable(props) {
	const unitConversion = ['gr', 'ml', 'kg', 'L'];
	return (
		<div>
			<table className='table'>
				<thead className='text-center'>
					<tr>
						<th scope='col'>id</th>
						<th scope='col'>name</th>
						<th scope='col'>price</th>
						<th scope='col'>bottle quantity</th>
						<th scope='col'>quantity per bottle</th>
						<th scope='col'>quantity in stock</th>
						<th scope='col'>Unit</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((element) => {
						return (
							<tr scope={element.scope} className='w-100 h-25' key={element.id}>
								<td>{element.id}</td>
								<td>{element.name}</td>
								<td>{element.price}</td>
								<td className='text-center'>{element.bottle_quantity}</td>
								<td className='text-center'>{element.quantity_per_bottle}</td>
								<td className='text-center'>{element.stock_quantity}</td>
								<td className='text-center'>
									{unitConversion[element.UnitId - 1]}
								</td>
								<td>
									<div className='btn-group'>
										<button
											type='button'
											className='btn btn-outline-primary'
											data-bs-toggle='modal'
											data-bs-target={`#editMaterial${element.id}`}
										>
											edit
										</button>
										<button className='btn btn-outline-danger'>delete</button>
										<div
											className='modal fade'
											id={`editMaterial${element.id}`}
											data-bs-backdrop='static'
											data-bs-keyboard='false'
											tabIndex='-1'
											aria-labelledby='staticBackdropLabel'
											aria-hidden='true'
										>
											<div className='modal-dialog'>
												<div className='modal-content'>
													<div className='modal-header'>
														<h5
															className='modal-title'
															id='staticBackdropLabel'
														>
															Edit Material
														</h5>
														<button
															type='button'
															className='btn-close'
															data-bs-dismiss='modal'
															aria-label='Close'
														></button>
													</div>
													<div className='modal-body'>
														<EditMaterial
															id={element.id}
															name={element.name}
															price={element.price}
															bottle_quantity={element.bottle_quantity}
															quantity_per_bottle={element.quantity_per_bottle}
															stock_quantity={element.stock_quantity}
															UnitId={element.UnitId}
														></EditMaterial>
													</div>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* <CustomModal id='#editMaterialModal' /> */}
		</div>
	);
}

export default MaterialTable;
