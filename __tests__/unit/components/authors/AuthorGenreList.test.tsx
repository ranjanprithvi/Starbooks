import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AuthorGenreList from "../../../../src/components/Authors/AuthorGenreList";
import useAuthors from "../../../../src/hooks/useAuthors";
import useGenres from "../../../../src/hooks/useGenres";
import "@testing-library/jest-dom";
import { httpService } from "../../../../src/services/http-service";

//mock window.location.replace
const mReload = jest.fn();
Object.defineProperty(window, "location", {
    value: {
        reload: mReload,
    },
});

// mock HttpService
jest.mock("../../../../src/services/http-service");
const mHttpService = httpService as jest.MockedFunction<typeof httpService>;
const mPost = jest.fn();
mPost.mockResolvedValue({ data: { _id: "3", name: "genre3" } });
const mDelete = jest.fn();
mDelete.mockResolvedValue({ data: { _id: "3", name: "genre3" } });

mHttpService.mockReturnValue({
    post: mPost,
    delete: mDelete,
    get: jest.fn(),
    patch: jest.fn(),
} as any);
// const mHttpService = HttpService as jest.Mocked<typeof HttpService>;

// beforeEach(() => {
//     HttpService.mockClear();
// });

// const mHttpObj = jest.fn();
// mHttpService.mockImplementation(() => {});

//mock useAuthors
jest.mock("../../../../src/hooks/useAuthors");
const mUseAuthors = useAuthors as jest.MockedFunction<typeof useAuthors>;

//mock useAuthors
jest.mock("../../../../src/hooks/useGenres");
const mUseGenres = useGenres as jest.MockedFunction<typeof useGenres>;

beforeAll(() => {
    mUseAuthors.mockReturnValue({
        authors: [
            {
                _id: "1",
                name: "author1",
            },
            {
                _id: "2",
                name: "author2",
            },
        ],
        error: "",
        setAuthors: jest.fn(),
        setError: jest.fn(),
        isLoading: false,
    });

    mUseGenres.mockReturnValue({
        genres: [
            {
                _id: "1",
                name: "genre1",
            },
            {
                _id: "2",
                name: "genre2",
            },
        ],
        error: "",
        setGenres: jest.fn(),
        setError: jest.fn(),
        isLoading: false,
    });
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("AuthorGenreList", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<AuthorGenreList />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("calls post method of HttpService when add button is clicked", async () => {
        render(<AuthorGenreList />);
        act(() => {
            fireEvent.change(
                screen.getByPlaceholderText(/enter new genre../i),
                {
                    target: { value: "genre3" },
                }
            );
        });
        fireEvent.click(screen.getByTestId("add-genre-button"));
        expect(mHttpService).toHaveBeenCalledTimes(1);
        expect(mPost).toHaveBeenCalledWith({ name: "genre3" });
        await waitFor(() => expect(mReload).toHaveBeenCalledTimes(1));
    });

    it("calls post method of HttpService when delete button is clicked", async () => {
        render(<AuthorGenreList />);

        fireEvent.click(screen.getByTestId("delete-genre-1"));
        expect(mHttpService).toHaveBeenCalledTimes(1);
        expect(mDelete).toHaveBeenCalledWith("1");
        await waitFor(() => expect(mReload).toHaveBeenCalledTimes(1));
    });
});
