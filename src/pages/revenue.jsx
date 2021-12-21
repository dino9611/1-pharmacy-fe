import React from 'react';
import RevenueText1 from '../components/UI/adminInventory/revenueText1';
import RevenueText2 from '../components/UI/adminInventory/revenueText2';
import RevenueText3 from '../components/UI/adminInventory/revenueText3';
import RevenueText4 from '../components/UI/adminInventory/revenueText4';

const Revenue = (props) => {
    return (
        <div className="m-5" style={{ width: "70vw" }}>
            <h3 className="text-center mb-4">Real Time Revenue Report Year 2021</h3>
            <div className="d-flex flex-row justify-content-between mb-5">
                <RevenueText1/>
                <RevenueText2/>
            </div>            
            <div className="d-flex flex-row justify-content-between">
                <RevenueText3/>
                <RevenueText4/>
            </div>
        </div>
    );
}
 
export default Revenue;