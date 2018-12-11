import React from "react";

export default class Filter extends React.Component {
    state = {
        isFilterMenuToggled: false,
        activeFilter: ""
    };

    handleToggleSelectedFilter = (filter, fn) => () => {
        const {onFilterSelect} = this.props;
        const {activeFilter} = this.state;
        if (activeFilter === filter) {
            this.setState({activeFilter: ""});
            onFilterSelect(null);
        } else {
            this.setState({activeFilter: filter});
            onFilterSelect(fn);
        }
    };

    handleFilterMenuToggle = () => {
        const {isFilterMenuToggled} = this.state;
        this.setState({isFilterMenuToggled: !isFilterMenuToggled});
    };

    render() {
        const {isFilterMenuToggled, activeFilter} = this.state;
        const {options} = this.props;
        return (
            options &&
            options.length && (
                <div className={`dropdown is-right ${isFilterMenuToggled ? "is-active" : ""}`}>
                    <div className="dropdown-trigger">
                        <button
                            onClick={this.handleFilterMenuToggle}
                            onBlur={this.handleFilterMenuToggle}
                            aria-haspopup="true"
                            aria-controls="filters"
                            className={`button ${activeFilter ? "is-warning" : ""}`}>
                            {activeFilter && <span>{activeFilter}</span>}
                            <span className="icon is-small">
                                <i className="fas fa-filter" />
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="filters" role="menu">
                        <div className="dropdown-content">
                            {options.map((option, i) => {
                                return (
                                    <a
                                        key={i}
                                        onMouseDown={this.handleToggleSelectedFilter(
                                            option.label,
                                            option.filterFn
                                        )}
                                        href="#"
                                        className={`dropdown-item ${
                                            activeFilter === option.label ? "is-active" : ""
                                        }`}>
                                        {option.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
        );
    }
}
