import {
    HStack,
    List,
    ListItem,
    Spinner,
    Text,
    Button,
} from "@chakra-ui/react";
import { getGenreIcon } from "./genreIcons";
import useGenres from "../hooks/useGenres";
import { Genre } from "../models/genre";

interface Props {
    selectedGenre: Genre | null;
    onSelectGenre: (genre: Genre | null) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
    const { genres, isLoading, error } = useGenres();
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

                {genres.map((genre) => {
                    // let GenreIcon = genreIcons[genre.name];
                    return (
                        <ListItem key={genre._id} paddingY="5px">
                            {/* <BsFilePerson /> */}
                            <Button
                                fontSize="lg"
                                variant="link"
                                colorScheme={
                                    selectedGenre === genre ? "teal" : ""
                                }
                                onClick={() => onSelectGenre(genre)}
                            >
                                <HStack>
                                    {getGenreIcon(genre.name)}
                                    <Text>{genre.name}</Text>
                                </HStack>
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};

export default GenreList;
