import React from "react";
import useData from "../hooks/useData";
import genreService, { Genre } from "../services/genre-service";
import {
    HStack,
    List,
    ListItem,
    Spinner,
    Text,
    Button,
} from "@chakra-ui/react";

interface Props {
    selectedGenre: Genre | null;
    onSelectGenre: (genre: Genre | null) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
    const { data: genres, isLoading, error } = useData<Genre>(genreService);
    if (error) return null;
    if (isLoading) return <Spinner />;

    return (
        <div>
            <List>
                <ListItem key="0" paddingY="5px">
                    <Button
                        fontSize="2xl"
                        colorScheme={selectedGenre === null ? "teal" : ""}
                        variant="link"
                        fontWeight="extrabold"
                        onClick={() => onSelectGenre(null)}
                    >
                        All Genres
                    </Button>
                </ListItem>

                {genres.map((genre) => (
                    <ListItem key={genre._id} paddingY="5px">
                        <Button
                            fontSize="lg"
                            variant="link"
                            colorScheme={selectedGenre === genre ? "teal" : ""}
                            onClick={() => onSelectGenre(genre)}
                        >
                            {genre.name}
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default GenreList;
