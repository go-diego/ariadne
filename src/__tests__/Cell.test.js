import React from "react";
import Cell from "../components/DataTable/Cell";
import {mount} from "enzyme";

describe("<Cell/>", () => {
    it("should render td element", () => {
        const wrapper = mount(<Cell />);
        expect(wrapper.find("td").length).toBe(1);
    });

    it("should spread props to root td", () => {
        const wrapper = mount(<Cell test-prop="TEST" />);
        expect(wrapper.find("td").props()["test-prop"]).toBe("TEST");
    });

    it("should render children inside td", () => {
        const children = <span>Hello World</span>;
        const wrapper = mount(<Cell>{children}</Cell>);
        expect(wrapper.find("td").find("span").length).toBe(1);
    });
});
