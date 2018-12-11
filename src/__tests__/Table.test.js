import React from "react";
import Table from "../components/DataTable/Table";
import {shallow} from "enzyme";

describe("<Table/>", () => {
    it("should render table element", () => {
        const wrapper = shallow(<Table />);
        expect(wrapper.find("table").length).toBe(1);
    });

    it("should render child tbody", () => {
        const wrapper = shallow(
            <Table>
                <tbody />
            </Table>
        );
        expect(wrapper.find("table").find("tbody").length).toBe(1);
    });
});
