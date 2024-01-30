import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import ColourModeSwitch from "../../../../src/components/common/ColourModeSwitch";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

const mToggleColorMode = jest.fn();
// const mUseColourMode = jest.fn().mockReturnValue();
jest.mock("@chakra-ui/react", () => {
    const originalModule = jest.requireActual("@chakra-ui/react");

    return {
        __esModule: true,
        ...originalModule,
        useColorMode: () => {
            return { colorMode: "light", toggleColorMode: mToggleColorMode };
        },
    };
});

describe("ColourModeSwitch", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<ColourModeSwitch />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("calls toggleColourMode when clicked", () => {
        const { getByTestId } = render(<ColourModeSwitch />);

        fireEvent.click(getByTestId("toggler"));
        expect(mToggleColorMode).toHaveBeenCalled();
    });
});
