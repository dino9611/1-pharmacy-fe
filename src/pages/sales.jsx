import React from 'react';
import SalesChart from '../components/UI/adminInventory/salesChart';

const AdminDashboard = () => {
    return (
        <div 
            className="d-flex flex-column justify-content-start align-items-center p-5 ms-3"
            style={{ width: "min-content" }}
        >
            <h4>Sales Revenue Year 2021</h4>
            <SalesChart/>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Distinctio, eius possimus illo magnam laborum reprehenderit sint in libero aperiam 
                modi ab atque ex dicta cum voluptates delectus dolorem, blanditiis necessitatibus?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum quae inventore dolorem 
                ipsa harum consequatur eius accusantium mollitia, quo error. Totam, maiores tempora. Porro 
                ab ex modi repellat expedita dolorem.
            </p>
        </div>
    );
}
 
export default AdminDashboard;