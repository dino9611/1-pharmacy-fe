import React, { useState } from 'react';

function Pagination(props) {
	const onChangeHandler = (event) => {
		props.limitChangeHandler(event.target.value);
	};

	const onClickHandler = (event) => {
		props.pageChangeHandler(event.target.value);
	};

	//both onChangeHandler and onClickHandler used to control state in parrent

	const onPageClickHandler = (event) => {
		props.directPageChangeHandler(event.target.value);
	};

	const pageNavLoop = (itemCount) => {
		let output = [];

		if (itemCount % props.limit === 0) {
			for (let i = 1; i <= itemCount / props.limit; i++) {
				output.push(i);
			}
			return;
		}
		for (let i = 1; i <= itemCount / props.limit; i++) {
			output.push(Math.ceil(i));
			if (i + 1 > itemCount / props.limit) {
				output.push(Math.ceil(i + 1));
			}
		}

		return output;
	};
	return (
		<div className='pagination'>
			<select name='limit' id='item-limit' onChange={onChangeHandler}>
				<option value='10'>10</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
			</select>
			{props.children}
			<button
				onClick={onClickHandler}
				value='prev'
				disabled={props.page <= 1 && true}
			>
				previous page
			</button>
			{props.itemCount &&
				pageNavLoop(props.itemCount).map((element) => {
					return (
						<button value={element} onClick={onPageClickHandler}>
							{element}
						</button>
					);
				})}
			<button
				onClick={onClickHandler}
				value='next'
				disabled={
					props.itemCount && pageNavLoop(props.itemCount).length === props.page
				}
			>
				next page
			</button>
		</div>
	);
}

/**
 * how to use?
 * - put in the the component to the desire section
 * - pass in props:
 * 		- limitChangeHandler(handler for limit item per page)
 * 		- pageChangeHandler(handler for page changes)
 * 		- itemCount(count total item for page)
 * 		- page (current page status)
 * 		- limit (limit item per page)
 */

export default Pagination;
