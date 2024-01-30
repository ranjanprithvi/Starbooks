import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import apiClient from "../../../../src/services/api-client";
import React from "react";
import { bookObj, booksArray, usersArray } from "../../../../src/data/mockData";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import _ from "lodash";

jest.mock("../../../../src/hooks/useBooks");
jest.mock("../../../../src/hooks/useUsers");

jest.mock("../../../../src/components/common/ProtectedAdminComponent");

//mock apiClient
jest.mock("../../../../src/services/api-client");
const mApiClient = apiClient as jest.Mocked<typeof apiClient>;
mApiClient.post.mockResolvedValue({ data: bookObj });

//mock useToast
const mToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
    ...(jest.requireActual("@chakra-ui/react") as any),
    useToast: () => mToast,
}));

//mock useNavigate
const mNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mNavigate,
}));

describe("RentalForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders", async () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/rentals/new`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders with none of the fields populated when creating a rental", async () => {
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/book/i)).toHaveValue("");
        expect(screen.getByLabelText(/user/i)).toHaveValue("");
    });

    it("does not submit when book is not selected", async () => {
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByRole("combobox", { name: /user/i }), {
                target: { value: usersArray[0]._id },
            });
            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(screen.getByText(/book is required/i)).toBeInTheDocument();
    });

    it("does not submit when user is not selected", async () => {
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByRole("combobox", { name: /book/i }), {
                target: { value: booksArray[0]._id },
            });
            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(screen.getByText(/user is required/i)).toBeInTheDocument();
    });

    it("submits with the correct data when both book and user are selected", async () => {
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByRole("combobox", { name: /book/i }), {
                target: { value: booksArray[0]._id },
            });
            fireEvent.change(screen.getByRole("combobox", { name: /user/i }), {
                target: { value: usersArray[0]._id },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).toHaveBeenCalledWith("/rentals", {
            user: usersArray[0]._id,
            book: booksArray[0]._id,
        });
    });

    it("displays error message in case of network error", async () => {
        const message = "Sorry. Something went wrong";
        mApiClient.post.mockRejectedValueOnce({});
        // process.env.VITE_BACKEND_URL = "http://invalidUrl";
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByRole("combobox", { name: /book/i }), {
                target: { value: booksArray[0]._id },
            });
            fireEvent.change(screen.getByRole("combobox", { name: /user/i }), {
                target: { value: usersArray[0]._id },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });
        expect(mToast).toHaveBeenCalled();
    });

    it("navigates to previous screen when canceled", async () => {
        render(
            <MemoryRouter initialEntries={[`/rentals/new`]}>
                <Routes />
            </MemoryRouter>
        );

        const cancelButton = screen.getByText(/cancel/i);
        cancelButton.click();
        expect(mNavigate).toHaveBeenCalledWith(-1);
    });
});
