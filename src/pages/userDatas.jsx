import React from 'react';
import UserDatasTable from '../components/UI/adminInventory/userDatasTable';
import '../style.css';

const UserDatas = () => {
    return (
        <div className="m-5">
            <h3 className="mb-4">User Transactions History</h3>
            <UserDatasTable/>
        </div>
    );
}
 
export default UserDatas;