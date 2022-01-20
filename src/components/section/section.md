# What is section component?

section component function as a wrapper parent for UI component and controller component. The main purpose of this component is to fetch data and pass it down to it's children.

Each time a controller change filter or sort or any other kind of state stored in parent it will trigger a useEffect hooks function of fetching with dependencies of that state

```js
// for the sake of example we assume that the data already been fetched and passed to the clidren component via props )props.products
function ParentSection(props) {
	const [searchText, setSearchText] = React.useState('');
	const [inStockOnly, setInStockOnly] = React.useState(false);

	return (
		<div className='parent'>
			<SearchBar
				filterText={filterText}
				inStockOnly={inStockOnly}
				onFilterTextChange={(text) => setFilterText(text)} //handler pass to filter to get back the value of the event change
				onInStockChange={(stock) => setInStockOnly(stock)}
			/>
			//controller component
			<ProductTable
				products={props.products} //data already fetched and passed to props
				filterText={filterText}
				inStockOnly={inStockOnly}
			/>{' '}
			//children renderer
		</div>
	); // parent as a wrapper where data flow from one childrend to it's siblings. From controller component to parent then passed down data to UI to get render
}
```

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

```

with passed down handler and trigger the handler in child component will allow you to freely passed down state changes control to child component eleminating too many global state and dispatch function.
