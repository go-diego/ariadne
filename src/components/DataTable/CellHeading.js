import React from "react";

export default function Cell(props) {
    return (
        <th>
            <div
                style={{height: "2em"}}
                className="is-centered is-flex justify-content-center align-items-center">
                {props.children}
            </div>
        </th>
    );
}
