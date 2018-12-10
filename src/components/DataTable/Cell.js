import React from "react";

export default function Cell(props) {
    return <td {...props}>{props.children}</td>;
}
