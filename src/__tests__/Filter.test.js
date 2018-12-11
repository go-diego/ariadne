import React from "react";
import Filter from "../components/DataTable/Filter";
import {mount} from "enzyme";

const props = {
    options: [
        {
            label: "Today",
            filterFn: jest.fn()
        },
        {
            label: "This Week",
            filterFn: jest.fn()
        },
        {
            label: "> $500",
            filterFn: jest.fn()
        }
    ]
};

describe("<Filter/>", () => {
    it("should call handleToggleSelectedFilter", () => {
        const wrapper = mount(<Filter {...props} />);
        const instance = wrapper.instance();
        const spy = jest
            .spyOn(instance, "handleToggleSelectedFilter")
            .mockImplementation(() => jest.fn());
        instance.forceUpdate();
        wrapper
            .find(".dropdown-item")
            .first()
            .simulate("mousedown");
        //expect(instance.handleToggleSelectedFilter).toBeCalledWith("Today");
        expect(spy).toHaveBeenCalled();
    });
});
