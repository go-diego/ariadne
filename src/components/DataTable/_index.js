import React from "react";
import Header from "./Header";
import Table from "./Table";
import Head from "./Head";
import Body from "./Body";
import Row from "./Row";
import Cell from "./Cell";
import CellHeading from "./CellHeading";

export default class DataTable extends React.Component {
    componentDidMount() {}

    render() {
        const {title, header, data} = this.props;
        return (
            <div>
                <Header title={title} />
                <Table>
                    <Head>
                        <Row>
                            <CellHeading>
                                <input type="checkbox" />
                            </CellHeading>
                            {header.map(cell => (
                                <CellHeading>{cell.label}</CellHeading>
                            ))}
                        </Row>
                    </Head>
                    <Body>
                        {data.map(datum => {
                            return (
                                <Row>
                                    <Cell>
                                        <input type="checkbox" />
                                    </Cell>
                                    {Object.values(datum).map(value => (
                                        <Cell>{value}</Cell>
                                    ))}
                                </Row>
                            );
                        })}
                    </Body>
                </Table>
            </div>
        );
    }
}
