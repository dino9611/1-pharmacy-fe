import React from "react";
import { Spinner } from "reactstrap";

const DashboardLoading = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
        >
            <Spinner style={{ width: "3rem", height: "3rem", color: "var(--blue-color)" }} />
            <h5 className="mt-3" style={{ color: "var(--pink-color)" }}>Fetching data . . .</h5>
        </div>
    );
};

export default DashboardLoading;