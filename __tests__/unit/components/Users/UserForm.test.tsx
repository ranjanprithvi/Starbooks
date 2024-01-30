import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import apiClient from "../../../../src/services/api-client";
// import { useToast } from "../../../../src/hooks/generic/useToast";
import React from "react";
import { userObj } from "../../../../src/data/mockData";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import _ from "lodash";
import moment from "moment";

jest.mock("../../../../src/hooks/useAuthors");
jest.mock("../../../../src/hooks/useGenres");
jest.mock("../../../../src/hooks/useUser");

jest.mock("../../../../src/components/common/ProtectedAdminComponent");

//mock apiClient
jest.mock("../../../../src/services/api-client");
const mApiClient = apiClient as jest.Mocked<typeof apiClient>;
mApiClient.post.mockResolvedValue({ data: userObj });

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

const userEntryData = {
    ..._.omit(userObj, ["_id", "activeRentals", "isAdmin"]),
    phoneNumber: Number.parseInt(userObj.phoneNumber),
    dateOfBirth: moment(userObj.dateOfBirth).format("YYYY-MM-DD"),
    membershipExpiry: moment(userObj.membershipExpiry).format("YYYY-MM-DD"),
};

const userDTO = {
    ...userEntryData,
    phoneNumber: userEntryData.phoneNumber.toString(),
};

describe("UserForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders", async () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/users/123`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders with none of the fields populated when creating a user", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/new`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading")).toHaveTextContent("New User");
        expect(screen.getByLabelText(/name/i)).toHaveValue("");
        expect(screen.getByLabelText(/email/i)).toHaveValue("");
        expect(screen.getByLabelText(/country code/i)).toHaveValue("");
        expect(screen.getByLabelText(/phone/i)).toHaveValue(null);
        expect(screen.getByLabelText(/date of birth/i)).toHaveValue("");
        expect(screen.getByLabelText(/membership expiry/i)).toHaveValue("");
        expect(screen.getByLabelText(/book limit/i)).toHaveValue("1");
    });

    it("renders with all the fields populated when editing a user", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading")).toHaveTextContent("Edit User");
        expect(screen.getByLabelText(/name/i)).toHaveValue(userEntryData.name);
        expect(screen.getByLabelText(/email/i)).toHaveValue(
            userEntryData.email
        );
        expect(
            screen.getByRole("combobox", { name: /country code/i })
        ).toHaveValue(userEntryData.countryCode);
        expect(screen.getByLabelText(/phone/i)).toHaveValue(
            userEntryData.phoneNumber
        );
        expect(screen.getByLabelText(/date of birth/i)).toHaveValue(
            userEntryData.dateOfBirth
        );
        expect(screen.getByLabelText(/membership expiry/i)).toHaveValue(
            userEntryData.membershipExpiry
        );
        expect(
            screen.getByRole("combobox", { name: /book limit/i })
        ).toHaveValue(userEntryData.maxBorrow.toString());
    });

    it("calls the post method with the right data when all fields are populated", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/name/i), {
                target: { value: userEntryData.name },
            });
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: userEntryData.email },
            });
            fireEvent.change(screen.getByLabelText(/country code/i), {
                target: {
                    value: userEntryData.countryCode,
                },
            });
            fireEvent.change(screen.getByLabelText(/phone/i), {
                target: {
                    value: userEntryData.phoneNumber,
                },
            });
            fireEvent.change(screen.getByLabelText(/date of birth/i), {
                target: {
                    value: userEntryData.dateOfBirth,
                },
            });
            fireEvent.change(screen.getByLabelText(/membership expiry/i), {
                target: {
                    value: userEntryData.membershipExpiry,
                },
            });
            fireEvent.change(screen.getByLabelText(/book limit/i), {
                target: { value: userEntryData.maxBorrow },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).toHaveBeenCalledWith("/users", userDTO);
        expect(mNavigate).toHaveBeenCalledWith("/userDetails/123", {
            replace: true,
        });
    });

    it("does not submit when no name, email, date of birth or membership expiry is entered", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/new`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
        expect(
            screen.getByText(/valid date of birth is required/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/membership expiry is required/i)
        ).toBeInTheDocument();
    });

    it("does not submit when email is not in the right format", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: "ab" },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).not.toHaveBeenCalled();
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });

    it("does not submit when phone number is a negative number", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/phone/i), {
                target: { value: -1 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).not.toHaveBeenCalled();
        expect(
            screen.getByText(/phone number must be positive/i)
        ).toBeInTheDocument();
    });

    it("does not submit when phone number is not a whole number", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/phone/i), {
                target: { value: 2000.5 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/phone number should be a whole number/i)
        ).toBeInTheDocument();
    });

    it("does not submit when phone number is greater than 11 digits", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/phone/i), {
                target: { value: 200000000000 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(
                /Phone Number should be less than or equal to 11 digits/i
            )
        ).toBeInTheDocument();
    });

    it("does not submit when date of birth is in the future", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/date of birth/i), {
                target: { value: 3000 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/valid date of birth is required/i)
        ).toBeInTheDocument();
    });

    it("displays error message in case of network error", async () => {
        const message = "Sorry. Something went wrong";
        mApiClient.patch.mockRejectedValueOnce({});
        // process.env.VITE_BACKEND_URL = "http://invalidUrl";
        render(
            <MemoryRouter initialEntries={[`/users/123`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).toHaveBeenCalledWith("/users/123", userDTO);
        expect(mToast).toHaveBeenCalled();
    });

    it("displays error message in case of network error", async () => {
        const message = "Sorry. Something went wrong";
        mApiClient.post.mockRejectedValueOnce({});
        // process.env.VITE_BACKEND_URL = "http://invalidUrl";
        render(
            <MemoryRouter initialEntries={[`/users/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/name/i), {
                target: { value: userEntryData.name },
            });
            fireEvent.change(screen.getByLabelText(/email/i), {
                target: { value: userEntryData.email },
            });
            fireEvent.change(screen.getByLabelText(/country code/i), {
                target: {
                    value: userEntryData.countryCode,
                },
            });
            fireEvent.change(screen.getByLabelText(/phone/i), {
                target: {
                    value: userEntryData.phoneNumber,
                },
            });
            fireEvent.change(screen.getByLabelText(/date of birth/i), {
                target: {
                    value: userEntryData.dateOfBirth,
                },
            });
            fireEvent.change(screen.getByLabelText(/membership expiry/i), {
                target: {
                    value: userEntryData.membershipExpiry,
                },
            });
            fireEvent.change(screen.getByLabelText(/book limit/i), {
                target: { value: userEntryData.maxBorrow },
            });

            await act(async () => {
                const submitButton = screen.getByText(
                    /submit/i
                ) as HTMLButtonElement;
                submitButton.click();
            });
        });
        expect(mApiClient.post).toHaveBeenCalledWith("/users", userDTO);
        expect(mToast).toHaveBeenCalled();
    });

    it("navigates to previous screen when canceled", async () => {
        render(
            <MemoryRouter initialEntries={[`/users/new`]}>
                <Routes />
            </MemoryRouter>
        );

        const cancelButton = screen.getByText(/cancel/i);
        cancelButton.click();
        expect(mNavigate).toHaveBeenCalledWith(-1);
    });
});
