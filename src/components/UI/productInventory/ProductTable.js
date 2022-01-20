// import React from 'react';

// function ProductTable(props) {
// 	return (
// 		<table className='table'>
// 			<thead className='text-center'>
// 				<tr>
// 					<th scope='col'>id</th>
// 					<th scope='col'>image</th>
// 					<th scope='col'>name</th>
// 					<th scope='col'>price</th>
// 					<th scope='col'>quantity in stock</th>
// 					<th scope='col'>Action</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{props.data.map((element) => {
// 					return (
// 						<tr scope={element.scope} className='w-100 h-25'>
// 							<td>{element.id}</td>
// 							<td className=''>
// 								<img class='img-responsive img-thumbnail' src={element.image} />
// 							</td>
// 							<td>{element.name}</td>
// 							<td>{element.price}</td>
// 							<td>{element.quantityInStock}</td>
// 							<td>
// 								<div className='btn-group'>
// 									<button
// 										className='btn btn-outline-primary'
// 										data-bs-toggle='offcanvas'
// 										data-bs-target='#topbar'
// 									>
// 										Edit
// 									</button>
// 									<button className='btn btn-outline-danger'>delete</button>
// 								</div>
// 							</td>
// 						</tr>
// 					);
// 				})}
// 			</tbody>
// 		</table>
// 	)
// }

// export default ProductTable;
