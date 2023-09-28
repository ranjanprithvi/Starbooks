import { Box, GridItem, HStack, Show } from "@chakra-ui/react";
import { useState } from "react";
import GenreList from "./GenreList";
import Searchbar from "./Searchbar";
import AuthorSelector from "./AuthorSelector";
import SortSelector from "./SortSelector";
import BookGrid from "./BookGrid";
import { BookSort, bookSortFields } from "../services/book-service";
import { Genre } from "../services/genre-service";
import { Author } from "../services/author-service";

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<BookSort>(bookSortFields[0]);

    return (
        <>
            <Show above="lg">
                <GridItem area="aside" paddingX="5">
                    <GenreList
                        selectedGenre={selectedGenre}
                        onSelectGenre={(genre) => setSelectedGenre(genre)}
                    />
                </GridItem>
            </Show>
            <GridItem area="main">
                <Box margin={5}>
                    <Searchbar setSearch={setSearch} />
                </Box>
                <HStack justifyContent="space-between">
                    <AuthorSelector
                        selectedAuthor={selectedAuthor}
                        onSelectAuthor={setSelectedAuthor}
                    ></AuthorSelector>
                    <SortSelector
                        sortField={sortBy}
                        onSort={setSortBy}
                    ></SortSelector>
                </HStack>
                <BookGrid
                    queryObject={{
                        genre: selectedGenre?._id,
                        author: selectedAuthor?._id,
                        search: search,
                        sortBy: sortBy.value,
                    }}
                />
            </GridItem>
        </>
    );
};

export default Books;
