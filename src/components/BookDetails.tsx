import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Skeleton,
    Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { BsPencilSquare } from "react-icons/bs";

const BookDetails = () => {
    const { id } = useParams();

    const { book, isLoading, error } = useBook(id, {
        populate: "author|genre",
    });

    if (error) return <Text>Book Not Found!</Text>;
    return (
        <GridItem colSpan={2} marginBottom={5} maxWidth="1280px" marginX="auto">
            <Box
                marginX={"5"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
            >
                <Grid
                    width={"100%"}
                    templateRows={{
                        base: "50px 4fr repeat(5,50px) 4fr",
                        lg: "50px 4fr repeat(5,50px) 4fr",
                    }}
                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                    columnGap={{ base: 2, md: 8 }}
                    rowGap={{ base: 2, md: 0 }}
                    padding={10}
                >
                    <GridItem rowSpan={7}>
                        {isLoading ? (
                            <Skeleton height="100%"></Skeleton>
                        ) : (
                            <Image
                                src={
                                    book.coverImage ||
                                    "https://bookcart.azurewebsites.net/Upload/Default_image.jpg"
                                }
                                borderRadius={10}
                                // marginX={"auto"}
                                height="100%"
                                // overflow={"clip"}
                            />
                        )}
                    </GridItem>

                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            height="100%"
                        >
                            <Link to={`/books/${id}`}>
                                <Button
                                    leftIcon={<BsPencilSquare />}
                                    colorScheme="facebook"
                                    marginTop={5}
                                >
                                    Edit
                                </Button>
                            </Link>
                        </Flex>
                    </GridItem>

                    <GridItem>
                        {" "}
                        <Flex alignItems="center" height="100%">
                            <Heading>{book.title}</Heading>
                        </Flex>
                    </GridItem>

                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Author: </Text>{" "}
                            <Text>{book.author?.name}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Year Published: </Text>{" "}
                            <Text>{book.yearPublished}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Genre: </Text>{" "}
                            <Text>{book.genre?.name}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Availability: </Text>{" "}
                            {book.numberInStock > 0 ? (
                                <Badge
                                    colorScheme="green"
                                    paddingX={2}
                                    paddingY={{ md: 1 }}
                                >
                                    {`Available (${book.numberInStock} copies)`}
                                </Badge>
                            ) : (
                                <Badge colorScheme="red" padding={2}>
                                    Out of Stock
                                </Badge>
                            )}
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Rating: </Text>{" "}
                            <Text>{book.rating}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        marginTop={5}
                        colSpan={{ base: 1, md: 2 }}
                        border="blue.100"
                    >
                        <Heading size={"lg"}>Description</Heading>
                        <Divider marginY="2" />

                        <Text>{book.description}</Text>
                    </GridItem>
                </Grid>
            </Box>
        </GridItem>
    );
};

export default BookDetails;
