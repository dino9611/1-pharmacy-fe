import 'chart.js/auto';
import { Bar } from 'react-chartjs-2'

const data = {
    labels:[ 
        "January", 
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    datasets:[
        {
            label: "Total Sales",
            data: [12, 3, 7, 5, 6, 11, 9, 10, 4, 5, 4, 7],
            backgroundColor: [ "powderblue", "thistle", "lightsalmon" ],
        },
    ]
}

function SalesChart() {
    return (
        <div style={{ width: "70vw" }}>
            <Bar
                data={data}
                options={{ maintainAspectRatio: true }}
            />
        </div>
    )
}

export default SalesChart;