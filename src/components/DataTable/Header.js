import React from "react";
import Search from "./Search";
import Filter from "./Filter";

export default class Header extends React.Component {
    render() {
        const {title} = this.props;
        return (
            <div>
                <h1 className="title">{title}</h1>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Search />
                    <Filter />
                </div>
            </div>
        );
    }
}
