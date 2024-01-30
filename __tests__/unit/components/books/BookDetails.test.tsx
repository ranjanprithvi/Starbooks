import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import BookDetails from "../../../../src/components/Books/BookDetails";
import { defaultBookCover } from "../../../../src/models/book";
import Routes from "../../../../src/Routes";
import { MemoryRouter } from "react-router-dom";

//mock useBook
jest.mock("../../../../src/hooks/useBook");

describe("BookDetails ", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/bookDetails/123`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with no cover image", () => {
        render(
            <MemoryRouter initialEntries={[`/bookDetails/noCover`]}>
                <Routes />
            </MemoryRouter>
        );
        expect(screen.getByRole("img").getAttribute("src")).toBe(
            defaultBookCover
        );
    });

    it("renders error message when no book with given Id is found", () => {
        const errorMsg = "Book Not Found!";

        render(
            <MemoryRouter initialEntries={[`/bookDetails/invalid`]}>
                <Routes />
            </MemoryRouter>
        );

        expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
});
