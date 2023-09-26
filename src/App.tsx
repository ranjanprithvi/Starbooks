import "./App.css";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import BookGrid from "./components/BookGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./services/genre-service";
import AuthorSelector from "./components/AuthorSelector";
import { Author } from "./services/author-service";

function App() {
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav"         
                      "aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                lg: "200px 1fr",
            }}
        >
            <GridItem area="nav">
                <NavBar />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside" paddingX="5">
                    <GenreList
                        selectedGenre={selectedGenre}
                        onSelectGenre={(genre) => setSelectedGenre(genre)}
                    />
                </GridItem>
            </Show>
            <GridItem area="main">
                <AuthorSelector
                    selectedAuthor={selectedAuthor}
                    onSelectAuthor={setSelectedAuthor}
                ></AuthorSelector>
                <BookGrid
                    queryObject={{
                        genre: selectedGenre?._id,
                        author: selectedAuthor?._id,
                    }}
                />
            </GridItem>
        </Grid>
    );
}

export default App;
