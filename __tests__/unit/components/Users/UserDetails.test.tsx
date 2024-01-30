import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import Routes from "../../../../src/Routes";
import { MemoryRouter } from "react-router-dom";

//mock useUser
jest.mock("../../../../src/hooks/useUser");

jest.mock("../../../../src/components/common/ProtectedComponent");

describe("UserDetails ", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={[`/userDetails/123`]}>
                    <Routes />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders error message when no user with given Id is found", () => {
        const errorMsg = "User Not Found!";

        render(
            <MemoryRouter initialEntries={[`/userDetails/invalid`]}>
                <Routes />
            </MemoryRouter>
        );

        expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
});
