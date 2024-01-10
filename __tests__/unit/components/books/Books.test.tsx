import "@testing-library/jest-dom";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import useBooks from "../../../../src/hooks/useBooks";
import { ChakraProvider } from "@chakra-ui/react";

jest.mock("../../../../src/hooks/useBooks");
const mUseBooks = useBooks as jest.MockedFunction<typeof useBooks>;

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

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Books", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/books`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders 10 skeletons when loading", () => {
        mUseBooks.mockReturnValueOnce({
            books: [],
            isLoading: true,
            error: "",
            setBooks: jest.fn(),
            setError: jest.fn(),
        });

        render(
            <ChakraProvider>
                <MemoryRouter initialEntries={[`/books`]}>
                    <Routes />
                </MemoryRouter>
            </ChakraProvider>
        );
        
        expect(screen.getAllByTestId("bookcard-skeleton").length).toBe(10);
    });

    it("displays the error in case of error", () => {
        mUseBooks.mockReturnValueOnce({
            books: [],
            isLoading: false,
            error: "Something went wrong",
            setBooks: jest.fn(),
            setError: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={[`/books`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
