import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Spinner style={{ width: "3rem", height: "3rem", color: "var(--blue-color)" }} />
            <h5 className="mt-3" style={{ color: "var(--pink-color)" }}>Obatin is preparing your page . . .</h5>
        </div>
    );
};

export default Loading;