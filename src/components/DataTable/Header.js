import React from "react";
import Search from "./Search";
import Filter from "./Filter";

export default class Header extends React.Component {
    render() {
        const {title, query, onSearchChange, multiSelected} = this.props;
        return (
            <div>
                <h1 className="title">{title}</h1>
                <div style={{display: "flex", justifyContent: "space-between", padding: "16px 0"}}>
                    <Search onChange={onSearchChange} value={query} />
                    <Filter />
                </div>
                <div>
                    <a
                        disabled={!multiSelected ? true : false}
                        className="button is-small is-danger is-rounded">
                        DELETE ALL
                    </a>
                </div>
            </div>
        );
    }
}