import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import BookDetails from "../../../../src/components/Books/BookDetails";
import { Book, defaultBookCover } from "../../../../src/models/book";
import useBook from "../../../../src/hooks/useBook";

//mock useParams
const mUseParams = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => mUseParams,
}));
mUseParams.mockReturnValue({ id: "123" });

//mock useBook
jest.mock("../../../../src/hooks/useBook");
const mUseBook = useBook as jest.MockedFunction<typeof useBook>;

describe("BookDetails ", () => {
    it("renders correctly", () => {
        mUseBook.mockReturnValueOnce({
            book: {
                _id: "123",
                title: "test",
                author: { _id: "1", name: "author1" },
                genre: { _id: "1", name: "genre1" },
                yearPublished: 2021,
                rating: 5,
                coverImage:
                    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1681496408i/58536026.jpg",
                description: "test",
                numberInStock: 1,
            },
            setBook: jest.fn(),
            isLoading: false,
            error: "",
            setError: jest.fn(),
        });
        const tree = renderer.create(<BookDetails />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with no cover image", () => {
        mUseBook.mockReturnValueOnce({
            book: {} as Book,
            setBook: jest.fn(),
            isLoading: false,
            error: "",
            setError: jest.fn(),
        });
        render(<BookDetails />);
        expect(screen.getByRole("img").getAttribute("src")).toBe(
            defaultBookCover
        );
    });

    it("renders error message when no book with given Id is found", () => {
        const errorMsg = "Book Not Found!";
        mUseBook.mockReturnValueOnce({
            book: {} as Book,
            setBook: jest.fn(),
            isLoading: false,
            error: errorMsg,
            setError: jest.fn(),
        });
        render(<BookDetails />);
        expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
});
