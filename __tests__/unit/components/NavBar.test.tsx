import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { LoginContext } from "../../../src/contexts/loginContext";
import NavBar from "../../../src/components/NavBar";

//mock useNavigate
const mUseLocation = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useLocation: () => mUseLocation,
}));

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

// Mock Chakra's hooks:
jest.mock("@chakra-ui/react", () => {
    const mod = jest.requireActual("@chakra-ui/react");
    return {
        ...(mod as Record<string, unknown>),
        useBreakpointValue: jest.fn().mockImplementation(() => "lg"),
        useColorModeValue: jest.fn().mockImplementation(() => "white"),
        Show: jest.fn().mockImplementation(({ children }) => <>{children}</>),
    };
});

test("Renders the Navbar correctly", () => {
    const tree = renderer
        .create(
            <LoginContext.Provider
                value={{
                    isLoggedIn: true,
                    isAdmin: true,
                    setLoggedIn: jest.fn(),
                    setAdmin: jest.fn(),
                }}
            >
                <MemoryRouter initialEntries={[`/`]}>
                    <NavBar />
                </MemoryRouter>
            </LoginContext.Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
