import {
    Box,
    Button,
    GridItem,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import GenreList from "./GenreList";
import Searchbar from "./Searchbar";
import AuthorSelector from "./AuthorSelector";
import SortSelector from "./SortSelector";
import BookGrid from "./BookGrid";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Author } from "../models/author";
import { BookSort, bookSortFields } from "../models/book";
import { Genre } from "../models/genre";
import { LoginContext } from "../contexts/loginContext";

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<BookSort>(bookSortFields[0]);

    const { isLoggedIn, isAdmin } = useContext(LoginContext);

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
                <HStack
                    marginX={5}
                    justifyContent="space-between"
                    marginBottom={5}
                >
                    <Searchbar setSearch={setSearch} />
                    {isLoggedIn && isAdmin && (
                        <Menu colorScheme="green">
                            <MenuButton
                                as={Button}
                                colorScheme="green"
                                leftIcon={<FaPlus></FaPlus>}
                                paddingRight="7"
                                // rightIcon={<BsChevronDown />}
                            >
                                Add
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to="/books/new">
                                    New Book
                                </MenuItem>
                                <MenuItem as={Link} to="/authorGenreList">
                                    Author/Genre
                                </MenuItem>
                                {/* <MenuItem as={Link} to="/genres/new">
                                    New Genre
                                </MenuItem> */}
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
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
