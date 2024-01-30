import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import useUsers from "../../../../src/hooks/useUsers";

jest.mock("../../../../src/hooks/useUsers");
const mUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

jest.mock("../../../../src/components/common/ProtectedAdminComponent");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Users", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/users`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("displays the error in case of error", () => {
        mUseUsers.mockReturnValueOnce({
            users: [],
            isLoading: false,
            error: "Something went wrong",
            setUsers: jest.fn(),
            setError: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={[`/users`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
