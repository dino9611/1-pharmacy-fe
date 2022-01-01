import React from 'react';
import UserHistoryTable from '../components/UI/adminInventory/userHistoryTable';
import '../style.css';

const UserHistory = () => {
    return (
        <div className="m-5">
            <h3 className="mb-4">User Transactions History</h3>
            <UserHistoryTable/>
        </div>
    );
}
 
export default UserHistory;