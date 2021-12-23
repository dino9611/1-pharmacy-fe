import { Form, Formik } from 'formik';
import React from 'react';

function CustomForm(props) {
	const onSubmitHandler = (value, { setSubmitting, resetForm }) => {
		props.submitHandler(value); // required to pass in props to parent
		// resetForm();
		// setSubmitting(false);
	};
	return (
		<div className={props.className}>
			<Formik
				enableReinitialize
				initialValues={props.initial}
				validationSchema={props.validate}
				onSubmit={onSubmitHandler}
			>
				<Form>{props.children}</Form>
			</Formik>
		</div>
	);
}

export default CustomForm;
