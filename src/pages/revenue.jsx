import React from 'react';
import RevenueText1 from '../components/UI/adminInventory/revenueText1';
import RevenueText2 from '../components/UI/adminInventory/revenueText2';
import RevenueText3 from '../components/UI/adminInventory/revenueText3';
import SalesChart from '../components/UI/adminInventory/salesChart';

const Revenue = (props) => {
    return (
        <div className="m-5">
            <h3 className="mb-4">Real Time Revenue Report All Year</h3>
            <div className="d-flex flex-row justify-content-between mb-5">
                <RevenueText1/>
                <RevenueText2/>
            </div>            
            <div className="d-flex flex-row justify-content-between mb-5">
                <RevenueText3/>
            </div>
            <SalesChart
                endpoint="sales/monthly-sales"
                title="Total Revenue & Potential Revenue per Month" //ganti
                subTitle="Current Nett Revenue"
                labelField="month" //ganti
                dataField="total_payment" //ganti
            />
        </div>
    );
}
 
export default Revenue;