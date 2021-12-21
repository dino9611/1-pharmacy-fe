import React from 'react';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';

const RevenueText1 = (props) => {
    const renderDate = (date) => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        return new Date(date).toLocaleString("en-EN", options);
    };

    return (
        <RevenueCard 
            style={{ 
                width: "58%", 
                height: "45vh"
                }}
            >
            <p 
                style={{ 
                    fontSize: 35, 
                    marginBottom: 0,
                    color: "var(--black-color)" 
                }}
            >
                Total Revenue
            </p>
            <p 
                style={{ 
                    fontSize: 20,
                    color: "whitesmoke", 
                    backgroundColor: "var(--pink-color)", 
                    width: "fit-content",
                    borderRadius: 15, 
                    padding: 3, 
                    paddingLeft: 10,
                    paddingRight: 10  
                }}
            >
                {renderDate(Date())}
            </p>
            <p 
                style={{ 
                    fontSize: 50,
                    textAlign: "end", 
                    color: "darkred",         
                }}
            >
                Rp. ???
            </p>
        </RevenueCard>
    );
}
 
export default RevenueText1;