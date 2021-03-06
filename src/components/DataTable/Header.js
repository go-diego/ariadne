import React from "react";
import Search from "./Search";
import Filter from "./Filter";

export default class Header extends React.Component {
    render() {
        const {
            title,
            query,
            onSearchChange,
            onFilterSelect,
            multiSelected,
            filterOptions
        } = this.props;
        return (
            <div>
                <h1 className="title">{title}</h1>
                <div className="is-flex justify-content-between padding-y">
                    <Search onChange={onSearchChange} value={query} />
                    <Filter onFilterSelect={onFilterSelect} options={filterOptions} />
                </div>
                <div>
                    <a
                        disabled={!multiSelected ? true : false}
                        className="button is-small is-danger is-rounded">
                        DELETE
                    </a>
                </div>
            </div>
        );
    }
}
