import React from "react";
import Head from "../components/DataTable/Head";
import {shallow} from "enzyme";

describe("<Head/>", () => {
    it("should render thead element", () => {
        const wrapper = shallow(<Head />);
        expect(wrapper.find("thead").length).toBe(1);
    });

    it("should render children th", () => {
        const children = [0, 1, 2, 3].map(child => <th key={child}>{child}</th>);
        const wrapper = shallow(<Head>{children}</Head>);
        expect(wrapper.find("thead").find("th").length).toBe(4);
    });
});
