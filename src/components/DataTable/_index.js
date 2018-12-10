import React from "react";
import Header from "./Header";
import Table from "./Table";
import Head from "./Head";
import Body from "./Body";
import Row from "./Row";
import Cell from "./Cell";
import CellHeading from "./CellHeading";

export default class DataTable extends React.Component {
    state = {
        originalData: this.props.data.map(datum => {
            datum._isSelected = false;
            return datum;
        }),
        filteredData: [],
        searchQuery: "",
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
        const originalData = this.state.originalData.map(o => {
            return {...o};
        });
        let multiSelected = false;

        if (check === "MASTER") {
            originalData.forEach(datum => {
                datum.isSelected = event.target.checked;
            });
        } else {
            originalData.forEach(datum => {
                if (datum.ID === check) {
                    datum.isSelected = event.target.checked;
                }
            });
        }

        if (originalData.filter(datum => datum.isSelected).length > 1) {
            multiSelected = true;
        }

        this.setState({originalData, multiSelected});
    };

    render() {
        const {
            searchQuery,
            filteredData,
            activeActionMenu,
            originalData,
            multiSelected
        } = this.state;
        const {title, header} = this.props;

        const activeData = searchQuery ? filteredData : originalData;
        return (
            <div>
                <Header
                    multiSelected={multiSelected}
                    query={searchQuery}
                    onSearchChange={this.handleSearch}
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
                                                checked={datum.isSelected}
                                                onChange={event =>
                                                    this.handleCheck(datum.ID, event)
                                                }
                                                type="checkbox"
                                            />
                                        </Cell>
                                        {Object.keys(datum)
                                            .filter(value => value !== "_isSelected")
                                            .map((key, i) => (
                                                <Cell key={i}>{datum[key]}</Cell>
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
