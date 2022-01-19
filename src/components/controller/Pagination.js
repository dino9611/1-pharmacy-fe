import React from 'react';
import usePagination from '../../hooks/usePagination.js';

function Pagination(props) {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
	} = props;
	const [paginationRange, DOTS] = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});
	//conditional rendering logic
	if (currentPage === 0 || !paginationRange || paginationRange.length < 2)
		return null;

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1]; // extract last element of range array

	return (
		<div className={`container ${props.className}`} style={{ backgroundColor: "inherit" }}>
			{props.children}

			<div className='col d-flex justify-content-center'>
				<button
					className='btn btn-secondary'
					disabled={currentPage === 1}
					onClick={onPrevious}
				>
					prev
				</button>
				{paginationRange.map((pageNumber) => {
					if (pageNumber === DOTS) {
						return <div className='p-1'>{DOTS}</div>;
					}
					return (
						<button
							className='btn btn-outline-secondary'
							onClick={() => onPageChange(pageNumber)}
						>
							{pageNumber}
						</button>
					);
				})}
				<button
					className='btn btn-secondary'
					disabled={currentPage === lastPage}
					onClick={onNext}
				>
					next
				</button>
			</div>
		</div>
	);
}

export default Pagination;
