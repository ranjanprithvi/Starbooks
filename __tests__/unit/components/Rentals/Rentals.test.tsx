import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import useRentals from "../../../../src/hooks/useRentals";

jest.mock("../../../../src/hooks/useRentals");
const mUseRentals = useRentals as jest.MockedFunction<typeof useRentals>;

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

describe("Rentals", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/rentals`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("displays the error in case of error", () => {
        mUseRentals.mockReturnValueOnce({
            rentals: [],
            isLoading: false,
            error: "Something went wrong",
            setRentals: jest.fn(),
            setError: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={[`/rentals`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
