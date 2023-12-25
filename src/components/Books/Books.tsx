import {
    Box,
    Button,
    GridItem,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import GenreList from "../Genres/GenreList";
import Searchbar from "../common/Searchbar";
import AuthorSelector from "../Authors/AuthorSelector";
import SortSelector, { Sort } from "../common/SortSelector";
import BookGrid from "./BookGrid";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Author } from "../../models/author";
import { bookSortFields } from "../../models/book";
import { Genre } from "../../models/genre";
import { LoginContext } from "../../contexts/loginContext";

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<Sort>(bookSortFields[0]);

    const { isLoggedIn, isAdmin } = useContext(LoginContext);

    return (
        <>
            <Show above="lg">
                <GridItem area="aside" paddingX="5">
                    <GenreList
                        selectedGenre={selectedGenre}
                        onSelectGenre={(genre) => {
                            setSelectedGenre(genre);
                            setSelectedAuthor(null);
                        }}
                    />
                </GridItem>
            </Show>
            <GridItem area="main">
                <HStack
                    marginX={5}
                    justifyContent="space-between"
                    marginBottom={5}
                >
                    <Searchbar
                        setSearch={setSearch}
                        placeholder="Search Books..."
                    />
                    {isLoggedIn && isAdmin && (
                        <Menu colorScheme="green">
                            <MenuButton
                                as={Button}
                                size="sm"
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
                <HStack marginX="5" justifyContent="space-between">
                    <AuthorSelector
                        size="sm"
                        selectedAuthor={selectedAuthor}
                        onSelectAuthor={(author: Author | null) => {
                            setSelectedAuthor(author);
                            setSelectedGenre(null);
                        }}
                    ></AuthorSelector>
                    <SortSelector
                        sortBy={sortBy}
                        sortFields={bookSortFields}
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
