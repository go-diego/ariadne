import React from "react";
import Body from "../components/DataTable/Body";
import {shallow} from "enzyme";

describe("<Body/>", () => {
    it("should render tbody element", () => {
        const wrapper = shallow(<Body />);
        expect(wrapper.find("tbody").length).toBe(1);
    });

    it("should render children tr", () => {
        const children = [0, 1, 2, 3].map(child => <tr key={child}>{child}</tr>);
        const wrapper = shallow(<Body>{children}</Body>);
        expect(wrapper.find("tbody").find("tr").length).toBe(4);
    });
});
