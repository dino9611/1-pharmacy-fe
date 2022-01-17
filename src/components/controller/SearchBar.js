import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useDebounce from '../../hooks/useDebounce';
import '../UI/adminInventory/style.css';

function SearchBar(props) {
	let [input, setInput] = useState('');
	let [searchBarisOpen, setSearchBarisOpen] = useState(false);
	let { debounceValue } = useDebounce({ value: input, delay: 400 });

	let { response, error, loading } = useAxios({
		url: props.url + `?name=${debounceValue ? debounceValue : ' '}`,
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
		setSearchBarisOpen(false);
	};

	return (
		<div style={{ position: "relative"}} onClick={() => setSearchBarisOpen(true)}>
			<input
				className='form-control me-2'
				type='text'
				placeholder='search'
				onChange={onChangeHandler}
				value={input}
			/>
			<div style={{ position: "absolute", height: "50vh", overflow: "scroll" }}>
				{response && input && searchBarisOpen? (
					response.map((element) => {
						return (
							<div className='px-3 py-1 dropdownItem' key={element.id} id={element.id} onClick={onClickHandler}
								style={{ 
									borderLeft: "0.5px solid gainsboro",
									borderRight: "0.5px solid gainsboro",
									borderBottom: "0.5px solid gainsboro",
								}}
							>
								{element.name}
							</div>
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default SearchBar;
