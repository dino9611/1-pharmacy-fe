import { useField } from 'formik';
import React from 'react';

function CustomSelect({ label, ...props }) {
	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name} className={props.classLabel}>
				{label}
			</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<h6 style={{ color: 'red' }}>{meta.error}</h6>
			) : null}
		</>
	);
}

export default CustomSelect;
