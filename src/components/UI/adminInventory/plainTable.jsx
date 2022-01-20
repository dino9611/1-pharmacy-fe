import React from 'react';

const PlainTable = (props) => {
    return (
        <table 
            class="table table-bordered"
            style={props.style}
        >
            <thead style={{ backgroundColor: "lightgray" }}>
                <tr className="text-center">
                    <th scope="col">No.</th>
                    <th scope="col">{props.labelCategory}</th>
                    <th scope="col">{props.dataCategory}</th>
                    { (props.dataCategory2) ? <th>{props.dataCategory2}</th> : null }
                </tr>
            </thead>
            <tbody style={{ backgroundColor: "linen" }}>
                {props.children}
            </tbody>  
        </table>
    );
}
 
export default PlainTable;
