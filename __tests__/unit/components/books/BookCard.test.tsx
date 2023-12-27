import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import BookCard from "../../../../src/components/Books/BookCard";
import { defaultBookCover } from "../../../../src/models/book";

describe("BookCard", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <BookCard
                    book={{
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
                    }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with no cover image", () => {
        render(
            <BookCard
                book={{
                    _id: "123",
                    title: "test",
                    author: { _id: "1", name: "author1" },
                    genre: { _id: "1", name: "genre1" },
                    yearPublished: 2021,
                    coverImage: "",
                    rating: 5,
                    description: "test",
                    numberInStock: 1,
                }}
            />
        );
        expect(screen.getByRole("img").getAttribute("src")).toBe(
            defaultBookCover
        );
    });
});
