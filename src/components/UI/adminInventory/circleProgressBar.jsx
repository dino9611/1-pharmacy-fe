import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import RadialSeparators from '../../controller/admin/radialSeparators';

const CircleProgressBar = (props) => {

    return (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbarWithChildren
                value={props.percentage}
                text={`${props.percentage}%`}
                strokeWidth={10}
                styles={buildStyles({
                strokeLinecap: "butt"
                })}
            >
                <RadialSeparators
                count={12}
                style={{
                    background: "#fff",
                    width: "2px",
                    // This needs to be equal to props.strokeWidth
                    height: `${10}%`
                }}
                />
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default CircleProgressBar;