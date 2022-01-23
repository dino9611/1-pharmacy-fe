import React from 'react';
import Prescriptions from '../../section/customOrder/Prescriptions';
import CustomModal from '../Modal';
function CustomOrder() {
	return (
		<CustomModal nav='Custom Order'>
			<Prescriptions />
		</CustomModal>
	);
}

export default CustomOrder;
