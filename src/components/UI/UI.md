# UI component

the main purpose of this component is to deal with rendering the data parent already passed down. There is two type that exist in the UI (conditional rendering and static render). Now each UI children will be warpped by a wrapper which sole purpose is to passed down data from parent

```js
function ProductRow(props) {
	const product = props.product;
	const name = product.stocked ? (
		product.name
	) : (
		<span style={{ color: 'red' }}>{product.name}</span>
	);

	return (
		<tr>
			<td>{name}</td>
			<td>{product.price}</td>
		</tr>
	);
} //main purpose is to render list item (conditional rendering)

function ProductCategoryRow(props) {
	const category = props.category;
	return (
		<tr>
			<th colSpan='2'>{category}</th>
		</tr>
	);
} // main purpose is to render item category (static render)

function ProductTable(props) {
	const filterText = props.filterText;
	const inStockOnly = props.inStockOnly;

	const rows = [];
	let lastCategory = null;

	props.products.forEach((product) => {
		if (product.name.indexOf(filterText) === -1) {
			return;
		}
		if (inStockOnly && !product.stocked) {
			return;
		}
		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					category={product.category}
					key={product.category}
				/>,
			);
		}
		rows.push(<ProductRow product={product} key={product.name} />);
		lastCategory = product.category;
	}); // ui logic renderer

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
} // wrapper with dynamic UI logic.
```
