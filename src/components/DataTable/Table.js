import React from "react";

export default function Table(props) {
    return (
        <table className="table" style={{width: "100%"}}>
            {props.children}
        </table>
    );
}
