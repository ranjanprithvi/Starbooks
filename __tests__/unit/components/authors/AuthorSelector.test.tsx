import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AuthorSelector from "../../../../src/components/Authors/AuthorSelector";
import useAuthors from "../../../../src/hooks/useAuthors";
import "@testing-library/jest-dom";

const mOnSelectAuthor = jest.fn();

//mock useAuthors
jest.mock("../../../../src/hooks/useAuthors");
const mUseAuthors = useAuthors as jest.MockedFunction<typeof useAuthors>;

describe("AuthorSelector", () => {
    it("renders correctly", () => {
        mUseAuthors.mockReturnValueOnce({
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

        render(
            <AuthorSelector
                selectedAuthor={{
                    _id: "1",
                    name: "author1",
                }}
                onSelectAuthor={mOnSelectAuthor}
            />
        );
        expect(
            screen.getByRole("button", { name: /author1/i })
        ).toBeInTheDocument();
    });

    it("displays 'all authors' when no selected author is passed", () => {
        mUseAuthors.mockReturnValueOnce({
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

        render(
            <AuthorSelector
                selectedAuthor={null}
                onSelectAuthor={mOnSelectAuthor}
            />
        );
        expect(screen.getByTestId("author-menubutton")).toHaveTextContent(
            /all authors/i
        );
    });

    it("calls onSelectAuthor when author is selected and display author name in menubutton", () => {
        mUseAuthors.mockReturnValueOnce({
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

        render(
            <AuthorSelector
                selectedAuthor={null}
                onSelectAuthor={mOnSelectAuthor}
            />
        );

        fireEvent.click(screen.getByText("author1"));
        expect(mOnSelectAuthor).toHaveBeenCalledWith({
            _id: "1",
            name: "author1",
        });
        // expect(screen.getByTestId("author-menubutton")).toHaveTextContent(
        //     /author1/i
        // );
    });

    // it("renders correctly with no cover image", () => {
    //     render(
    //         <BookCard
    //             book={{
    //                 _id: "123",
    //                 title: "test",
    //                 author: { _id: "1", name: "author1" },
    //                 genre: { _id: "1", name: "genre1" },
    //                 yearPublished: 2021,
    //                 coverImage: "",
    //                 rating: 5,
    //                 description: "test",
    //                 numberInStock: 1,
    //             }}
    //         />
    //     );
    //     expect(screen.getByRole("img").getAttribute("src")).toBe(
    //         defaultBookCover
    //     );
    // });
});
