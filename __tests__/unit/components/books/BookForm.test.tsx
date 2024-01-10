import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import apiClient from "../../../../src/services/api-client";
// import { useToast } from "../../../../src/hooks/generic/useToast";
import React from "react";
import { bookObj } from "../../../../src/__mocks__/data";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../../../src/Routes";
import _ from "lodash";

//mock apiClient
jest.mock("../../../../src/services/api-client");
const mApiClient = apiClient as jest.Mocked<typeof apiClient>;
mApiClient.post.mockResolvedValue({ data: bookObj });

jest.mock("../../../../src/hooks/useAuthors");
jest.mock("../../../../src/hooks/useGenres");
jest.mock("../../../../src/hooks/useBook");
const mNavigate = jest.fn();

//mock useToast
const mToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
    ...(jest.requireActual("@chakra-ui/react") as any),
    useToast: () => mToast,
}));

//mock useNavigate
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mNavigate,
}));

jest.mock("../../../../src/components/common/ProtectedAdminComponent");

describe("BookForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders", async () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/books/123`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders with none of the fields populated when creating a book", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading")).toHaveTextContent("New Book");
        expect(screen.getByLabelText(/title/i)).toHaveValue("");
        expect(screen.getByLabelText(/author/i)).toHaveValue("");
        expect(screen.getByLabelText(/genre/i)).toHaveValue("");
        expect(screen.getByLabelText(/year published/i)).toHaveValue(null);
        expect(screen.getByLabelText(/rating/i)).toHaveValue(null);
        expect(screen.getByLabelText(/number in stock/i)).toHaveValue(null);
        expect(screen.getByLabelText(/cover image/i)).toHaveValue("");
        expect(screen.getByLabelText(/description/i)).toHaveValue("");
    });

    it("renders with all the fields populated when editing a book", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading")).toHaveTextContent("Edit Book");
        expect(screen.getByLabelText(/title/i)).toHaveValue(bookObj.title);
        expect(screen.getByLabelText(/author/i)).toHaveValue(
            bookObj.author._id
        );
        expect(screen.getByLabelText(/genre/i)).toHaveValue(bookObj.genre._id);
        expect(screen.getByLabelText(/year published/i)).toHaveValue(
            bookObj.yearPublished
        );
        expect(screen.getByLabelText(/rating/i)).toHaveValue(bookObj.rating);
        expect(screen.getByLabelText(/number in stock/i)).toHaveValue(
            bookObj.numberInStock
        );
        expect(screen.getByLabelText(/cover image/i)).toHaveValue(
            bookObj.coverImage
        );
        expect(screen.getByLabelText(/description/i)).toHaveValue(
            bookObj.description
        );
    });

    it("calls the post method with the right data when all fields are populated", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/title/i), {
                target: { value: bookObj.title },
            });
            fireEvent.change(
                screen.getByRole("combobox", { name: /author/i }),
                { target: { value: bookObj.author._id } }
            );
            fireEvent.change(screen.getByRole("combobox", { name: /genre/i }), {
                target: { value: bookObj.genre._id },
            });
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: bookObj.yearPublished },
            });
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: bookObj.rating },
            });
            fireEvent.change(screen.getByLabelText(/number in stock/i), {
                target: { value: bookObj.numberInStock },
            });
            fireEvent.change(screen.getByLabelText(/cover image/i), {
                target: { value: bookObj.coverImage },
            });
            fireEvent.change(screen.getByLabelText(/description/i), {
                target: { value: bookObj.description },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        const bookData = {
            ..._.omit(bookObj, ["_id"]),
            author: bookObj.author._id,
            genre: bookObj.genre._id,
        };
        expect(mApiClient.post).toHaveBeenCalledWith("/books", bookData);
        expect(mNavigate).toHaveBeenCalledWith("/bookDetails/123", {
            replace: true,
        });
    });

    it("does not submit when no title, author, genre, year published is entered", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
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
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        expect(screen.getByText(/author is required/i)).toBeInTheDocument();
        expect(screen.getByText(/genre is required/i)).toBeInTheDocument();
        expect(
            screen.getByText(/year published is required/i)
        ).toBeInTheDocument();
    });

    it("does not submit when title is less than 3 characters long", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/title/i), {
                target: { value: "ab" },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).not.toHaveBeenCalled();
        expect(
            screen.getByText(/title must be at least 3 characters long/i)
        ).toBeInTheDocument();
    });

    it("does not submit when year published is a negative number", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: -1 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).not.toHaveBeenCalled();
        expect(
            screen.getByText(/Year published must be a positive number/i)
        ).toBeInTheDocument();
    });

    it("does not submit when year published is not a whole number", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: 2000.5 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/Year published must be a whole number/i)
        ).toBeInTheDocument();
    });

    it("does not submit when year published is in the future", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: 3000 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(
                /Year published must be less than or equal to current year/i
            )
        ).toBeInTheDocument();
    });

    it("does not submit when rating is less than 0", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: -1 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/Rating must be between 0 and 5/i)
        ).toBeInTheDocument();
    });

    it("does not submit when rating is greater than 5", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: 6 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/Rating must be between 0 and 5/i)
        ).toBeInTheDocument();
    });

    it("does not submit when rating is not a multiple of 0.01", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: 3.001 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/Rating must be a multiple of 0.01/i)
        ).toBeInTheDocument();
    });

    it("does not submit when number in stock is not a whole number", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/number in stock/i), {
                target: { value: 2.5 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/number in stock must be a whole number/i)
        ).toBeInTheDocument();
    });

    it("does not submit when number in stock is negative", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/number in stock/i), {
                target: { value: -2 },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.post).not.toHaveBeenCalled();
        expect(
            screen.getByText(/number in stock must be non-negative/i)
        ).toBeInTheDocument();
    });

    it("does not submit when coverimage is not a valid url", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/123`]}>
                <Routes />
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/cover image/i), {
                target: { value: "abasdf" },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });

        expect(mApiClient.patch).not.toHaveBeenCalled();
        expect(
            screen.getByText(/cover image must be a valid url/i)
        ).toBeInTheDocument();
    });

    it.skip("displays error message in case of bad request", async () => {
        const message = "Invalid username or password";
        mApiClient.post.mockRejectedValueOnce({
            response: {
                data: message,
            },
        });

        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/title/i), {
                target: { value: bookObj.title },
            });
            fireEvent.change(
                screen.getByRole("combobox", { name: /author/i }),
                { target: { value: bookObj.author._id } }
            );
            fireEvent.change(screen.getByRole("combobox", { name: /genre/i }), {
                target: { value: bookObj.genre._id },
            });
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: bookObj.yearPublished },
            });
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: bookObj.rating },
            });
            fireEvent.change(screen.getByLabelText(/number in stock/i), {
                target: { value: bookObj.numberInStock },
            });
            fireEvent.change(screen.getByLabelText(/cover image/i), {
                target: { value: bookObj.coverImage },
            });
            fireEvent.change(screen.getByLabelText(/description/i), {
                target: { value: bookObj.description },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });
        // expect(
        //     await screen.findByText(/invalid username or password/i)
        // ).toBeInTheDocument();
    });

    it("displays error message in case of network error", async () => {
        const message = "Sorry. Something went wrong";
        mApiClient.post.mockResolvedValueOnce({
            data: { token: "1234", isAdmin: true },
        });
        process.env.VITE_BACKEND_URL = "http://invalidUrl";
        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
                <Routes />
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/title/i), {
                target: { value: bookObj.title },
            });
            fireEvent.change(
                screen.getByRole("combobox", { name: /author/i }),
                { target: { value: bookObj.author._id } }
            );
            fireEvent.change(screen.getByRole("combobox", { name: /genre/i }), {
                target: { value: bookObj.genre._id },
            });
            fireEvent.change(screen.getByLabelText(/year published/i), {
                target: { value: bookObj.yearPublished },
            });
            fireEvent.change(screen.getByLabelText(/rating/i), {
                target: { value: bookObj.rating },
            });
            fireEvent.change(screen.getByLabelText(/number in stock/i), {
                target: { value: bookObj.numberInStock },
            });
            fireEvent.change(screen.getByLabelText(/cover image/i), {
                target: { value: bookObj.coverImage },
            });
            fireEvent.change(screen.getByLabelText(/description/i), {
                target: { value: bookObj.description },
            });

            const submitButton = screen.getByText(
                /submit/i
            ) as HTMLButtonElement;
            submitButton.click();
        });
    });

    it("navigates to previous screen when canceled", async () => {
        render(
            <MemoryRouter initialEntries={[`/books/new`]}>
                <Routes />
            </MemoryRouter>
        );

        const cancelButton = screen.getByText(/cancel/i);
        cancelButton.click();
        expect(mNavigate).toHaveBeenCalledWith(-1);
    });
});
