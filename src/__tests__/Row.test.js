import React from "react";
import Row from "../components/DataTable/Row";
import {shallow} from "enzyme";

describe("<Row/>", () => {
    it("should render tr element", () => {
        const wrapper = shallow(<Row />);
        expect(wrapper.find("tr").length).toBe(1);
    });

    it("should render children td", () => {
        const children = [0, 1, 2, 3].map(child => <td key={child}>{child}</td>);
        const wrapper = shallow(<Row>{children}</Row>);
        expect(wrapper.find("tr").find("td").length).toBe(4);
    });
});
