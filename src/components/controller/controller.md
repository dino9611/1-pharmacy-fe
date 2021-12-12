# Controller component

This component is the one that is going to control the render of the web app we are goint to build. User will be able to control what they want to see, and if User not going to control it, it is already has a default value that will set as the initial state for the renderer.

## lifting the state up from children to parent

```js
import React from 'react';

function Button(props) {
	return (
		<div>
			<button onClick={() => props.onChildClick(1)}>click from child</button>
		</div>
	);
}

export default Button; // button component child of Count will passin onChildClick handler passed down via props.onChildClick and initialize it to trigger handler on parrent

import React, { useState } from 'react';
import Button from './Button';

function Count() {
	let [count, setCount] = useState(0);
	const onChildClickHandler = (int) => {
		setCount(count + int);
	};

	return (
		<div>
			{count}
			<Button onChildClick={onChildClickHandler} />
		</div>
	);
}

export default Count; // count have a child of a button that will be passed down a props called onChildClick that will point to onChildClickHandler

//the same thing also apply to this code

function SearchBar(props) {
	const filterText = props.filterText;
	const inStockOnly = props.inStockOnly;

	return (
		<form>
			<input
				type='text'
				placeholder='Search...'
				value={filterText}
				onChange={(e) => props.onFilterTextChange(e.target.value)}
			/>
			<p>
				<input
					type='checkbox'
					checked={inStockOnly}
					onChange={(e) => props.onInStockChange(e.target.checked)}
				/>{' '}
				Only show products in stock
			</p>
		</form>
	); // both search bar checkbox has handler props passed down by parent as a gateway of inverse state value flow
}

function ParentSection(props) {
	const [searchText, setSearchText] = React.useState('');
	const [inStockOnly, setInStockOnly] = React.useState(false);

	return (
		<div className='parent'>
		//controller component
			<SearchBar
				filterText={filterText}
				inStockOnly={inStockOnly}
				onFilterTextChange={(text) => setFilterText(text)}
				onInStockChange={(stock) => setInStockOnly(stock)}
				//both onFilterChange and onInStockChange have handler pass to filter to get back the value of the event change
			/>
			// although this one is a bad one since it is not clear how the handler passed down

		//children renderer
			<ProductTable
				products={props.products} //data already fetched and passed to props
				filterText={filterText}
				inStockOnly={inStockOnly}
			/>{' '}

		</div>
	); // parent as a wrapper where data flow from one childrend to it's siblings. From controller component to parent then passed down data to UI to get render
}

```

with passed down handler and trigger the handler in child component will allow you to freely passed down state changes control to child component eleminating too many global state and dispatch function.
