import React, { isValidElement, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useDebounce from '../../hooks/useDebounce';

function SearchBar(props) {
	let [input, setInput] = useState('');

	let { debounceValue } = useDebounce({ value: input, delay: 400 });

	let { response, error, loading } = useAxios({
		url: props.url + `/?name=${debounceValue ? debounceValue : ''}`,
		method: 'get',
	});

	const onChangeHandler = (event) => {
		setInput(event.target.value);
	};

	const onClickHandler = (event) => {
		let id = +event.target.id;
		const result = response.filter((element) => element.id === id);
		setInput(result[0].name);
		props.onSearchClick(result);
	};

	return (
		<div>
			<input
				className='form-control me-2'
				type='text'
				value={props.name}
				placeholder='search'
				onChange={onChangeHandler}
				value={input}
			/>
			{response && input ? (
				response.map((element) => {
					return (
						<div key={element.id} id={element.id} onClick={onClickHandler}>
							{element.name}
						</div>
					);
				})
			) : (
				<></>
			)}
			{/* if selected selection will close if change it will open up */}
		</div>
	);
}

export default SearchBar;
