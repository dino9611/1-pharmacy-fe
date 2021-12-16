import React, { isValidElement, useState } from 'react';
import useAxios from '../../hooks/useAxios';

function SearchBar(props) {
	let [isAdded, setIsAdded] = useState(false);
	let [input, setInput] = useState('');
	let { response, error, loading } = useAxios({
		url: props.url + `/?name=${input ? input : 'a'}`,
		method: 'get',
	});

	const onChangeHandler = (event) => {
		setInput(event.target.value);
		setIsAdded(false);
	};

	const onClickHandler = (event) => {
		let id = +event.target.id;
		const result = response.filter((element) => element.id === id);
		setInput(result[0].name);
		setIsAdded(true);
		props.onSearchClick(result);
	};

	return (
		<div>
			<input
				type='text'
				placeholder='search'
				onChange={onChangeHandler}
				value={input}
			/>
			{response && !isAdded && input ? (
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
