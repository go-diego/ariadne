import React from "react";
import Search from "../components/DataTable/Search";
import {mount} from "enzyme";

const props = {
    value: "Hello World",
    onChange: jest.fn()
};

describe("<Search/>", () => {
    it("should render input", () => {
        const wrapper = mount(<Search />);
        expect(wrapper.find("input").length).toBe(1);
    });

    it("should read value from props", () => {
        const wrapper = mount(<Search {...props} />);
        expect(wrapper.find("input").props().value).toBe("Hello World");
    });

    it("should call onChange from props when input onChange is triggered", () => {
        const wrapper = mount(<Search {...props} />);
        wrapper.find("input").simulate("change", {target: {value: "Hello World"}});
        expect(props.onChange).toBeCalledWith("Hello World");
    });
});
