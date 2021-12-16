import { useField, Field } from 'formik';
import React from 'react';

function CustomTextInput({ label, ...props }) {
	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<Field className='text-input' {...field} {...props} />
			{props.children}
			{meta.touched && meta.error ? (
				<h6 style={{ color: 'red' }}>{meta.error}</h6>
			) : null}
		</>
	);
}

export default CustomTextInput;
