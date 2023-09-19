import React from "react";
import useData from "../hooks/useData";
import genreService, { Genre } from "../services/genre-service";
import { HStack, List, ListItem, Text } from "@chakra-ui/react";

const GenreList = () => {
    const { data: genres, isLoading, error } = useData<Genre>(genreService);
    return (
        <div>
            <List>
                {genres.map((genre) => (
                    <ListItem key={genre._id} paddingY="5px">
                        <Text fontSize="lg">{genre.name}</Text>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default GenreList;
