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
        originalData: this.props.data,
        filteredData: [],
        searchQuery: "",
        activeActionMenu: ""
    };

    componentDidMount() {}

    handleSearch = searchQuery => {
        this.setState({searchQuery});
        const originalData = this.state.originalData.map(o => {
            return {...o};
        });

        /**
         * TODO:
         * Room for improvement. Fields through which to search should be dynamic
         */
        const filteredData = originalData.filter(
            datum =>
                datum.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                datum.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                datum.Date.includes(searchQuery) ||
                datum.Amount.toString().includes(searchQuery) ||
                datum.ID.toLowerCase().includes(searchQuery.toLowerCase())
        );
        this.setState({filteredData});
    };

    handleRowActionMenu = activeActionMenu => {
        this.setState({activeActionMenu});
    };

    render() {
        const {searchQuery, filteredData, activeActionMenu} = this.state;
        const {title, header, data} = this.props;

        const activeData = searchQuery ? filteredData : data;
        return (
            <div>
                <Header query={searchQuery} onSearchChange={this.handleSearch} title={title} />
                <Table>
                    <Head>
                        <Row>
                            <CellHeading>
                                <input type="checkbox" />
                            </CellHeading>
                            {header.map((cell, i) => (
                                <CellHeading key={i}>{cell.label}</CellHeading>
                            ))}
                        </Row>
                    </Head>
                    <Body>
                        {activeData.map(datum => {
                            return (
                                <Row key={datum.ID}>
                                    <Cell>
                                        <input type="checkbox" />
                                    </Cell>
                                    {Object.values(datum).map((value, i) => (
                                        <Cell key={i}>{value}</Cell>
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
                        })}
                    </Body>
                </Table>
            </div>
        );
    }
}
