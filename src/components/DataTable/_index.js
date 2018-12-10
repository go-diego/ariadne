import React from "react";
import Header from "./Header";
import Table from "./Table";
import Head from "./Head";
import Body from "./Body";
import Row from "./Row";
import Cell from "./Cell";
import CellHeading from "./CellHeading";
import format from "date-fns/format";

export default class DataTable extends React.Component {
    state = {
        originalData: this.props.data.map(datum => {
            datum._isSelected = false;
            return datum;
        }),
        filteredData: [],
        searchQuery: "",
        isFiltered: false,
        activeActionMenu: "",
        multiSelected: false
    };

    handleSearch = searchQuery => {
        this.setState({searchQuery});
        const originalData = this.state.originalData.map(o => {
            return {...o};
        });

        const filteredData = originalData.filter(datum => {
            return Object.keys(datum).some(key =>
                datum[key]
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        });
        this.setState({filteredData});
    };

    handleFilter = filterFn => {
        const originalData = this.state.originalData.map(o => {
            return {...o};
        });
        if (filterFn) {
            this.setState({isFiltered: true});
            const filteredData = filterFn(originalData);
            this.setState({filteredData});
        } else {
            this.setState({isFiltered: false});
        }
    };

    handleSort = (prop, type) => () => {
        console.log("PROP", prop);
        console.log("TYPe", type);
        // originalData.sort((a,b) => {

        // })
    };

    handleRowActionMenu = activeActionMenu => {
        this.setState({activeActionMenu});
    };

    handleCheck = (check, event) => {
        const {searchQuery, isFiltered} = this.state;
        const originalData = this.state.originalData.map(o => {
            return {...o};
        });
        const filteredData = this.state.filteredData.map(o => {
            return {...o};
        });
        const activeData = searchQuery || isFiltered ? filteredData : originalData;

        let multiSelected = false;

        if (check === "MASTER") {
            activeData.forEach(datum => {
                datum._isSelected = event.target.checked;
            });
        } else {
            activeData.forEach(datum => {
                if (datum.ID === check) {
                    datum._isSelected = event.target.checked;
                }
            });
        }

        if (activeData.filter(datum => datum._isSelected).length > 1) {
            multiSelected = true;
        }

        this.setState({multiSelected});
        if (searchQuery || isFiltered) {
            this.setState({filteredData: activeData});
        } else {
            this.setState({originalData: activeData});
        }
    };

    render() {
        const {
            searchQuery,
            filteredData,
            activeActionMenu,
            originalData,
            multiSelected,
            isFiltered
        } = this.state;
        const {title, header, filterOptions} = this.props;

        const activeData = searchQuery || isFiltered ? filteredData : originalData;
        return (
            <div>
                <Header
                    filterOptions={filterOptions}
                    multiSelected={multiSelected}
                    query={searchQuery}
                    onSearchChange={this.handleSearch}
                    onFilterSelect={this.handleFilter}
                    title={title}
                />
                <Table>
                    <Head>
                        <Row>
                            <CellHeading noGrow>
                                <span
                                    style={{
                                        display: "inline-flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        alignItems: "center",
                                        height: "2.25em"
                                    }}>
                                    <input
                                        onChange={event => this.handleCheck("MASTER", event)}
                                        type="checkbox"
                                    />
                                </span>
                            </CellHeading>
                            {header.map((cell, i) => (
                                <CellHeading key={i}>
                                    {(cell.noSort && (
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                alignItems: "center",
                                                height: "2.25em"
                                            }}>
                                            {cell.label}
                                        </span>
                                    )) || <a className="button is-text">{cell.label}</a>}
                                </CellHeading>
                            ))}
                        </Row>
                    </Head>
                    <Body>
                        {(activeData.length > 0 &&
                            activeData.map(datum => {
                                return (
                                    <Row key={datum.ID}>
                                        <Cell>
                                            <input
                                                checked={datum._isSelected}
                                                onChange={event =>
                                                    this.handleCheck(datum.ID, event)
                                                }
                                                type="checkbox"
                                            />
                                        </Cell>
                                        {Object.keys(datum)
                                            .filter(value => value !== "_isSelected")
                                            .map((key, i) => (
                                                <Cell key={i}>
                                                    {key === "Date"
                                                        ? format(new Date(datum[key]), "MM/DD/YYYY")
                                                        : datum[key]}
                                                </Cell>
                                            ))}
                                        <Cell>
                                            <div
                                                className={`dropdown ${
                                                    activeActionMenu == datum.ID ? "is-active" : ""
                                                }`}>
                                                <div className="dropdown-trigger">
                                                    <button
                                                        onBlur={this.handleRowActionMenu}
                                                        onClick={() =>
                                                            this.handleRowActionMenu(datum.ID)
                                                        }
                                                        style={{width: 32, height: 32}}
                                                        className="button is-rounded is-paddingless"
                                                        aria-haspopup="true"
                                                        aria-controls={datum.ID}>
                                                        <span className="icon is-small">
                                                            <i className="fas fa-ellipsis-v" />
                                                        </span>
                                                    </button>
                                                </div>
                                                <div
                                                    className="dropdown-menu"
                                                    id={datum.ID}
                                                    role="menu">
                                                    <div className="dropdown-content">
                                                        <a className="dropdown-item has-text-primary is-white">
                                                            EDIT
                                                        </a>
                                                        <hr className="dropdown-divider" />
                                                        <a className="dropdown-item has-text-danger is-white">
                                                            DELETE
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Cell>
                                    </Row>
                                );
                            })) || (
                            <Row>
                                <Cell colSpan={header.length + 1}>No Records found</Cell>
                            </Row>
                        )}
                    </Body>
                </Table>
            </div>
        );
    }
}
