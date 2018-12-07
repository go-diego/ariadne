import React from "react";

export default class Search extends React.Component {
    render() {
        const {onChange, value} = this.props;
        return (
            <div className="control is-loading">
                <input
                    onChange={event => onChange(event.target.value)}
                    className="input is-rounded"
                    type="text"
                    placeholder="Search"
                    value={value}
                />
            </div>
        );
    }
}
