import "@testing-library/jest-dom";
import LoginForm from "../../src/components/LoginForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { LoginContext } from "../../src/contexts/loginContext";
import apiClient from "../../src/services/api-client";
import { useToast } from "../../src/hooks/generic/useToast";
// import mockAxios from "jest-mock-axios";

const correctEmail = "correctEmail@starbooks.com";
const correctPassword = "correctPassword";
const wrongEmail = "wrongEmail@starbooks.com";

const mockedSetLoggedIn = jest.fn();

//mock window.location.replace
const mockReplace = jest.fn();
Object.defineProperty(window, "location", {
    value: {
        replace: mockReplace,
    },
});

//mock apiClient
jest.mock("../../src/services/api-client");
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

//mock useToast
const mockedShowError = jest.fn();
const mockedShowSuccess = jest.fn();
jest.mock("../../src/hooks/generic/useToast");
const mockedUseToast = useToast as jest.MockedFunction<typeof useToast>;
mockedUseToast.mockReturnValue({
    showError: mockedShowError,
    showSuccess: mockedShowSuccess,
});

//mock useNavigate
const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUseNavigate,
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("LoginForm", () => {
    it("renders", async () => {
        render(<LoginForm />);

        expect(screen.getByText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
        expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    });

    it("calls the post method with the credentials when both email and password are entered", async () => {
        mockedApiClient.post.mockResolvedValueOnce({
            data: { token: "1234", isAdmin: true },
        });
        render(
            <LoginContext.Provider
                value={{
                    isLoggedIn: false,
                    setLoggedIn: mockedSetLoggedIn,
                    isAdmin: false,
                    setAdmin: jest.fn(),
                }}
            >
                <LoginForm />
            </LoginContext.Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: correctEmail },
            });
            fireEvent.change(screen.getByLabelText(/password/i), {
                target: { value: correctPassword },
            });
            const loginButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            loginButton.click();
        });

        expect(mockedApiClient.post).toHaveBeenCalledWith("/auth/login", {
            email: correctEmail,
            password: correctPassword,
        });
        expect(mockReplace).toHaveBeenCalledWith("/books");
    });

    it("does not attempt login when no email is entered", async () => {
        render(
            <LoginContext.Provider
                value={{
                    isLoggedIn: false,
                    setLoggedIn: mockedSetLoggedIn,
                    isAdmin: false,
                    setAdmin: jest.fn(),
                }}
            >
                <LoginForm />
            </LoginContext.Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/password/i), {
                target: { value: correctPassword },
            });
            const loginButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            loginButton.click();
        });

        expect(mockedApiClient.post).not.toHaveBeenCalled();
    });

    it("does not attempt login when no password is entered", async () => {
        render(
            <LoginContext.Provider
                value={{
                    isLoggedIn: false,
                    setLoggedIn: mockedSetLoggedIn,
                    isAdmin: false,
                    setAdmin: jest.fn(),
                }}
            >
                <LoginForm />
            </LoginContext.Provider>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: correctEmail },
            });
            const loginButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            loginButton.click();
        });

        expect(mockedApiClient.post).not.toHaveBeenCalled();
    });

    it("displays error message in case of bad request", async () => {
        const message = "Invalid username or password";
        mockedApiClient.post.mockRejectedValueOnce({
            response: {
                data: message,
            },
        });

        render(
            <LoginContext.Provider
                value={{
                    isLoggedIn: false,
                    setLoggedIn: mockedSetLoggedIn,
                    isAdmin: false,
                    setAdmin: jest.fn(),
                }}
            >
                <LoginForm />
            </LoginContext.Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: wrongEmail },
            });
            fireEvent.change(screen.getByLabelText(/password/i), {
                target: { value: correctPassword },
            });

            const loginButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            loginButton.click();
        });

        expect(mockedShowError).toHaveBeenCalledWith(message);

        // expect(
        //     await screen.findByText(/invalid username or password/i)
        // ).toBeInTheDocument();
    });

    it("displays error message in case of network error", async () => {
        const message = "Sorry. Something went wrong";
        mockedApiClient.post.mockRejectedValueOnce({
            response: "Error",
        });
        mockedApiClient.post.mockResolvedValueOnce({
            data: { token: "1234", isAdmin: true },
        });
        process.env.VITE_BACKEND_URL = "http://invalidUrl";
        render(
            <LoginContext.Provider
                value={{
                    isLoggedIn: false,
                    setLoggedIn: mockedSetLoggedIn,
                    isAdmin: false,
                    setAdmin: jest.fn(),
                }}
            >
                <LoginForm />
            </LoginContext.Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: correctEmail },
            });
            fireEvent.change(screen.getByLabelText(/password/i), {
                target: { value: correctPassword },
            });

            const loginButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            loginButton.click();
        });

        expect(mockedShowError).toHaveBeenCalledWith(message);
    });

    it("navigates to previous screen when canceled", async () => {
        render(<LoginForm />);

        const cancelButton = screen.getByText(/cancel/i);
        cancelButton.click();
        expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
});
