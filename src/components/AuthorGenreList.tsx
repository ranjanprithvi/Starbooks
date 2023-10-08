import useGenres from "../hooks/useGenres";
import useAuthors from "../hooks/useAuthors";
import {
    Button,
    GridItem,
    HStack,
    Heading,
    Input,
    List,
    ListItem,
    MenuItem,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import HttpService from "../services/http-service";

const AuthorGenreList = () => {
    const { genres } = useGenres();
    const { authors } = useAuthors();
    const toast = useToast();

    const lists = [
        {
            heading: "Authors",
            name: "author",
            items: authors,
            inputRef: useRef(null),
        },
        {
            heading: "Genres",
            name: "genre",
            items: genres,
            inputRef: useRef(null),
        },
    ];

    const onAdd = (listName: string, value: string = "") => {
        const service = new HttpService(`/${listName}s`);

        service
            .post({ name: value })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err.response.data,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <GridItem colSpan={2} width="auto" margin={5}>
            <HStack justifyContent="space-evenly">
                {lists.map((list) => (
                    <VStack
                        key={list.name}
                        border="2px"
                        borderRadius={10}
                        padding={10}
                    >
                        <Heading> {list.heading}</Heading>
                        <List
                            width="100%"
                            height="50vh"
                            overflow="scroll"
                            border="1px"
                            borderColor="gray.200"
                        >
                            {list.items.map((item) => (
                                <ListItem
                                    paddingY="2"
                                    paddingRight="10"
                                    paddingLeft="5"
                                    key={item._id}
                                    border="1px"
                                    borderColor="gray.50"
                                >
                                    {item.name}
                                </ListItem>
                            ))}
                        </List>
                        <HStack marginY="2">
                            <Input
                                ref={list.inputRef}
                                placeholder={`Enter new ${list.name}..`}
                            />
                            <Button
                                colorScheme="teal"
                                paddingX="8"
                                onClick={() => {
                                    const textBox = list.inputRef.current
                                        ? (list.inputRef
                                              .current as HTMLInputElement)
                                        : null;
                                    onAdd(list.name, textBox?.value);
                                }}
                            >
                                Add {list.name}
                            </Button>
                        </HStack>
                    </VStack>
                ))}
            </HStack>
        </GridItem>
    );
};

export default AuthorGenreList;
