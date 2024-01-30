import "@testing-library/jest-dom";
import SortSelector from "../../../../src/components/common/SortSelector";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const onSort = jest.fn();

const sortFields = [
    { name: "Date Added", value: "-_id" },
    { name: "Title", value: "title" },
    { name: "Rating", value: "-rating" },
    { name: "Year Published", value: "-yearPublished" },
];

describe("SortSelector", () => {
    it("renders initally with the correct sort selected", async () => {
        render(
            <SortSelector
                onSort={onSort}
                sortFields={sortFields}
                sortBy={sortFields[0]}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Order By: " + sortFields[0].name,
            })
        ).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /Order By/i }));
        await waitFor(() => {
            fireEvent.click(
                screen.getByRole("menuitem", { name: sortFields[1].name })
            );
        });
        expect(onSort).toHaveBeenCalledWith(sortFields[1]);
    });
});
