import React, { useState } from 'react';
import Dropdown from '../components/controller/dropdown';
import RevenueChart from '../components/UI/adminInventory/revenueChart';
import RevenueText1 from '../components/UI/adminInventory/revenueText1';
import RevenueText2 from '../components/UI/adminInventory/revenueText2';
import RevenueText3 from '../components/UI/adminInventory/revenueText3';

const Revenue = (props) => {
    const [year, setYear] = useState(2021); // useState(new Date().getFullYear());
    const years = [ 2020, 2021, 2022 ];

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
            <Dropdown 
                className="me-2 text-end"
                label="Filter by Year" 
                onClick={(value, index) => setYear(value)} 
                datas={years}
            />
            <RevenueChart
                endpoint="revenue/monthly-revenue"
                year={year}
                title={`Total Revenue & Potential Revenue per Month Year ${year}`}
                subTitle="Current Nett Revenue"
                subTitle2="Current Potential Revenue"
                labelField="month"
                dataField="total_revenue"
            />
        </div>
    );
}
 
export default Revenue;