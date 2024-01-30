import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import ProtectedComponent from "../../../../src/components/common/ProtectedComponent";

describe("ProtectedAdminComponent", () => {
    jest.mock("react", () => {
        const originalModule = jest.requireActual("react");

        return {
            __esModule: true,
            ...originalModule,
            useContext: null,
        };
    });

    jest.mock("react-router-dom", () => {
        const originalModule = jest.requireActual("react-router-dom");

        return {
            __esModule: true,
            ...originalModule,
            Navigate: () => <div>Navigate</div>,
            Nav: () => <div>Nav</div>,
        };
    });

    it("renders children when user is logged in", () => {
        React.useContext = jest.fn().mockReturnValue({ isLoggedIn: true });
        const ChildComponent = () => <div>Child Component</div>;
        const { getByText } = render(
            <ProtectedComponent>
                <ChildComponent />
            </ProtectedComponent>
        );

        expect(getByText("Child Component")).toBeInTheDocument();
    });

    it.skip("doesnt render children when user is not logged in", () => {
        React.useContext = jest.fn().mockReturnValue({ isLoggedIn: false });

        const ChildComponent = () => <div>Child Component</div>;
        const { getByText } = render(
            <ProtectedComponent>
                <ChildComponent />
            </ProtectedComponent>
        );

        expect(getByText("Child Component")).not.toBeInTheDocument();
    });
});
