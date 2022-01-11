import React, { useMemo } from 'react';

export default function usePagination({
	totalCount,
	pageSize = 9, //limit
	currentPage = 1, //base 1 index min 1 not 0
	siblingCount = 1, // total number of page shown for user to select
}) {
	const DOTS = '.....';
	const range = (start, end) => {
		let length = end - start + 1;
		return Array.from({ length }, (_, index) => index + start);
		// create an array of certain length and set the elements within it from start to end value
	};

	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize); // total number of button we are going to render

		// Page count is determenined as siblingCount + firstPage + lastPage + currentPage + 2*dots
		const totalPageNumbers = siblingCount + 5;

		/**
		 * case 1
		 * if the number of pages is less than the page numbers
		 * we want to show in our paginationComponent, we return the range [1 ... totalPageCount]
		 */

		if (totalPageCount < totalPageNumbers) return range(1, totalPageCount);
		/**
		 * calculate left and right sibling index and make sure they are within range 1 and total
		 */

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1); //making sure if 1 is the lowest number in page
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		); //making sure if the last page is the same as totalPageCount

		// we don't show dots just when there is just one page number to be inserted

		const shouldShowLeftDots = leftSiblingIndex > 2; // false if 1 and 2
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2; // false if index higher than count -2

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		//case 2 no left dots to show, but right dots to be shown
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		// case 3 no right dots to show but left dots to be shown
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount,
			);

			return [firstPageIndex, DOTS, ...rightRange];
		}

		// case 4 both left and right dots to be shown

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, currentPage, siblingCount]); // useMemo to optimize and compute logic

	return [paginationRange, DOTS];
}