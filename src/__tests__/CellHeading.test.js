import React from "react";
import CellHeading from "../components/DataTable/CellHeading";
import {mount} from "enzyme";

describe("<CellHeading/>", () => {
    it("should render td element", () => {
        const wrapper = mount(<CellHeading />);
        expect(wrapper.find("th").length).toBe(1);
    });

    it("should render div as root inside of th", () => {
        const wrapper = mount(<CellHeading />);
        expect(wrapper.find("th").find("div").length).toBe(1);
    });

    it("should render children inside root div", () => {
        const children = <span>Hello World</span>;
        const wrapper = mount(<CellHeading>{children}</CellHeading>);
        expect(
            wrapper
                .find("th")
                .find("div")
                .find("span").length
        ).toBe(1);
    });
});
