import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import ProtectedAdminComponent from "../../../../src/components/common/ProtectedAdminComponent";

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

    it("renders children when user is admin", () => {
        React.useContext = jest
            .fn()
            .mockReturnValue({ isAdmin: true, isLoggedIn: true });
        const ChildComponent = () => <div>Child Component</div>;
        const { getByText } = render(
            <ProtectedAdminComponent>
                <ChildComponent />
            </ProtectedAdminComponent>
        );

        expect(getByText("Child Component")).toBeInTheDocument();
    });
    it.skip("doesnt render children when user is not admin", () => {
        React.useContext = jest
            .fn()
            .mockReturnValue({ isAdmin: false, isLoggedIn: true });

        const ChildComponent = () => <div>Child Component</div>;
        const { getByText } = render(
            <ProtectedAdminComponent>
                <ChildComponent />
            </ProtectedAdminComponent>
        );

        expect(getByText("Child Component")).not.toBeInTheDocument();
    });

    it.skip("doesnt render children when user is not logged in", () => {
        React.useContext = jest
            .fn()
            .mockReturnValue({ isAdmin: true, isLoggedIn: false });

        const ChildComponent = () => <div>Child Component</div>;
        const { getByText } = render(
            <ProtectedAdminComponent>
                <ChildComponent />
            </ProtectedAdminComponent>
        );

        expect(getByText("Child Component")).not.toBeInTheDocument();
    });
});
