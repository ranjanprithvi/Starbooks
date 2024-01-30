import "@testing-library/jest-dom";
import Searchbar from "../../../../src/components/common/Searchbar";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const onSearch = jest.fn();

describe("SearchBar", () => {
    it("calls setSearch when text is altered", () => {
        render(<Searchbar setSearch={onSearch} placeholder="searchbar" />);

        expect(screen.getByPlaceholderText("searchbar")).toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText("searchbar"), {
            target: { value: "test" },
        });

        jest.useFakeTimers();
        jest.runAllTimers();
        setTimeout(() => {
            expect(onSearch).toHaveBeenCalledWith("test");
        }, 600);
    });
});
