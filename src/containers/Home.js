import React from "react";
import DataTable from "../components/DataTable/_index";

export default class Home extends React.Component {
    state = {
        data: [
            {
                ID: "3471DA17-401F-9633-BF81-4CADA6FD5C79",
                Name: "Kyra Lester",
                Description: "Curabitur dictum. Phasellus in",
                Date: "2017-07-23T04:24:49-07:00",
                Amount: 345.54
            },
            {
                ID: "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
                Name: "Buckminster Alvarado",
                Description: "dui, in sodales elit erat vitae risus. Duis a mi",
                Date: "2018-11-08T05:44:15-08:00",
                Amount: 677.08
            },
            {
                ID: "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
                Name: "Athena Smith",
                Description: "massa lobortis ultrices. Vivamus rhoncus.",
                Date: "2018-11-11T06:19:57-08:00",
                Amount: 73.67
            },
            {
                ID: "74749D4F-A43F-34E8-A687-D54924B17251",
                Name: "Cameron Thompson",
                Description: "dolor. Fusce mi lorem, vehicula et, rutrum eu,",
                Date: "2019-09-30T06:56:15-07:00",
                Amount: 807.6
            }
        ],
        header: [
            {
                label: "ID",
                noSort: true
            },
            {
                label: "Name",
                type: "string"
            },
            {
                label: "Description",
                noSort: true
            },
            {
                label: "Date",
                type: "date"
            },
            {
                label: "Amount",
                type: "number"
            },
            {
                label: "Action",
                noSort: true
            }
        ]
    };

    render() {
        const {data, header} = this.state;
        return (
            <div className="section">
                <div className="container">
                    <DataTable title="Lorem Ipsum" header={header} data={data} />
                </div>
            </div>
        );
    }
}
