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
        originalData: this.props.data,
        data: this.props.data.map(datum => {
            datum._isSelected = false;
            return datum;
        }),
        filteredData: [],
        searchQuery: "",
        isFiltered: false,
        activeActionMenu: "",
        rowInEditMode: "",
        multiSelected: false
    };

    handleSearch = searchQuery => {
        this.setState({searchQuery});
        const data = this.state.data.map(o => {
            return {...o};
        });

        const filteredData = data.filter(datum => {
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
        const data = this.state.data.map(o => {
            return {...o};
        });
        if (filterFn) {
            this.setState({isFiltered: true});
            const filteredData = filterFn(data);
            this.setState({filteredData});
        } else {
            this.setState({isFiltered: false});
        }
    };

    handleSort = (prop, type) => () => {
        console.log("PROP", prop);
        console.log("TYPe", type);
        // data.sort((a,b) => {

        // })
    };

    handleRowActionMenu = activeActionMenu => {
        this.setState({activeActionMenu});
    };

    handleRowEditMode = row => () => {
        console.log("ROW", row);
        this.setState({rowInEditMode: row, activeActionMenu: ""});
    };

    handleRowEdit = (prop, i) => event => {
        const {searchQuery, isFiltered} = this.state;
        const data = this.state.data.map(o => {
            return {...o};
        });
        const filteredData = this.state.filteredData.map(o => {
            return {...o};
        });
        const activeData = searchQuery || isFiltered ? filteredData : data;

        console.log("activeData[i][prop]", activeData[i][prop]);
        activeData[i][prop] = event.target.value;

        if (searchQuery || isFiltered) {
            this.setState({filteredData: activeData});
        } else {
            this.setState({data: activeData});
        }
    };

    handleCancelEditMode = rowId => () => {
        const {originalData} = this.state;
        const originalRow = originalData.filter(row => row.ID === rowId)[0];
        const {searchQuery, isFiltered} = this.state;
        const data = this.state.data.map(o => {
            return {...o};
        });
        const filteredData = this.state.filteredData.map(o => {
            return {...o};
        });
        const activeData = searchQuery || isFiltered ? filteredData : data;

        activeData.forEach(row => {
            if (row.ID === rowId) {
                row.Description = originalRow.Description;
            }
        });

        if (searchQuery || isFiltered) {
            this.setState({filteredData: activeData});
        } else {
            this.setState({data: activeData});
        }

        this.setState({rowInEditMode: ""});
    };

    handleSaveEdit = event => {
        this.setState({rowInEditMode: ""});
    };

    handleCheck = (check, event) => {
        const {searchQuery, isFiltered} = this.state;
        const data = this.state.data.map(o => {
            return {...o};
        });
        const filteredData = this.state.filteredData.map(o => {
            return {...o};
        });
        const activeData = searchQuery || isFiltered ? filteredData : data;

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
            this.setState({data: activeData});
        }
    };

    render() {
        const {
            searchQuery,
            filteredData,
            activeActionMenu,
            data,
            multiSelected,
            isFiltered,
            rowInEditMode
        } = this.state;
        const {title, header, filterOptions} = this.props;

        const activeData = searchQuery || isFiltered ? filteredData : data;

        const EditModeRowActions = rowId => {
            return (
                <div className="buttons are-small is-flex">
                    <a
                        onClick={this.handleSaveEdit}
                        className="button is-primary is-rounded is-small">
                        Save
                    </a>
                    <a
                        onClick={this.handleCancelEditMode(rowId)}
                        className="button is-light is-rounded is-small">
                        Cancel
                    </a>
                </div>
            );
        };

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
                            <CellHeading>
                                <input
                                    disabled={rowInEditMode !== "" ? true : null}
                                    onChange={event => this.handleCheck("MASTER", event)}
                                    type="checkbox"
                                />
                            </CellHeading>
                            {header.map((cell, i) => (
                                <CellHeading key={i}>
                                    {(cell.noSort && <span>{cell.label}</span>) || (
                                        <a className="button is-text">{cell.label}</a>
                                    )}
                                </CellHeading>
                            ))}
                        </Row>
                    </Head>
                    <Body>
                        {(activeData.length > 0 &&
                            activeData.map((datum, rowIndex) => {
                                return (
                                    <Row key={datum.ID}>
                                        <Cell>
                                            <input
                                                disabled={rowInEditMode !== "" ? true : null}
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
                                                    {(() => {
                                                        const column = header.filter(
                                                            h => h.label === key
                                                        );

                                                        if (column.length > 0) {
                                                            if (column[0].isEditable) {
                                                                if (rowInEditMode === datum.ID) {
                                                                    return (
                                                                        <textarea
                                                                            onChange={this.handleRowEdit(
                                                                                key,
                                                                                rowIndex
                                                                            )}
                                                                            value={datum[key]}
                                                                            className="textarea is-primary"
                                                                            rows="2"
                                                                        />
                                                                    );
                                                                } else {
                                                                    return datum[key];
                                                                }
                                                            } else {
                                                                return key === "Date"
                                                                    ? format(
                                                                          new Date(datum[key]),
                                                                          "MM/DD/YYYY"
                                                                      )
                                                                    : datum[key];
                                                            }
                                                        }
                                                    })()}
                                                </Cell>
                                            ))}
                                        <Cell>
                                            {(rowInEditMode === datum.ID &&
                                                EditModeRowActions(datum.ID)) || (
                                                <div
                                                    className={`dropdown ${
                                                        activeActionMenu == datum.ID
                                                            ? "is-active"
                                                            : ""
                                                    }`}>
                                                    <div className="dropdown-trigger">
                                                        <button
                                                            disabled={
                                                                !!rowInEditMode &&
                                                                rowInEditMode !== datum.ID
                                                                    ? true
                                                                    : null
                                                            }
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
                                                            <a
                                                                onMouseDown={this.handleRowEditMode(
                                                                    datum.ID
                                                                )}
                                                                className="dropdown-item has-text-primary is-white">
                                                                EDIT
                                                            </a>
                                                            <hr className="dropdown-divider" />
                                                            <a className="dropdown-item has-text-danger is-white">
                                                                DELETE
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
