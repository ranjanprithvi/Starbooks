import "@testing-library/jest-dom";
import renderer, { act } from "react-test-renderer";
import GenreList from "../../../../src/components/Genres/GenreList";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useGenres from "../../../../src/hooks/useGenres";
import { genresArray } from "../../../../src/data/mockData";

const handleSelectGenre = jest.fn();

jest.mock("../../../../src/hooks/useGenres");
const mUseGenres = useGenres as jest.MockedFunction<typeof useGenres>;

jest.mock("@chakra-ui/react", () => {
    const mod = jest.requireActual("@chakra-ui/react");
    return {
        ...(mod as Record<string, unknown>),
        Spinner: jest.fn().mockImplementation(() => <>Spinner</>),
    };
});

describe("GenreList", () => {
    it("renders", () => {
        const tree = renderer
            .create(
                <GenreList
                    onSelectGenre={handleSelectGenre}
                    selectedGenre={null}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("does not load in case of error", () => {
        mUseGenres.mockReturnValueOnce({
            genres: [],
            isLoading: false,
            error: "Error",
            setGenres: jest.fn(),
            setError: jest.fn(),
        });
        render(
            <GenreList onSelectGenre={handleSelectGenre} selectedGenre={null} />
        );
        expect(screen.queryByText("All Genres")).toBeNull();
    });

    it("loads spinner when loading", () => {
        mUseGenres.mockReturnValueOnce({
            genres: [],
            isLoading: true,
            error: "",
            setGenres: jest.fn(),
            setError: jest.fn(),
        });
        render(
            <GenreList onSelectGenre={handleSelectGenre} selectedGenre={null} />
        );
        expect(screen.getByText(/spinner/i)).toBeInTheDocument();
    });

    it("calls onSelectedGenre when genre is selected", async () => {
        render(
            <GenreList onSelectGenre={handleSelectGenre} selectedGenre={null} />
        );

        await act(async () => {
            fireEvent.click(screen.getByText(genresArray[0].name));
        });

        expect(handleSelectGenre).toHaveBeenCalledWith(genresArray[0]);
    });
});
