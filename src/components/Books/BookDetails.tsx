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
import useBook from "../../hooks/useBook";
import { BsPencilSquare } from "react-icons/bs";
import { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext";
import { defaultBookCover } from "../../models/book";

const BookDetails = () => {
    const { id } = useParams();
    if (!id) return <Text>Book Not Found!</Text>;
    const { isLoggedIn, isAdmin } = useContext(LoginContext);

    const {
        book: {
            coverImage,
            title,
            numberInStock,
            author,
            genre,
            yearPublished,
            description,
            rating,
            _id,
        },
        isLoading,
        error,
    } = useBook(id);

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
                        base: "50px 4fr repeat(5,50px) auto",
                        lg: "50px 4fr repeat(5,50px) auto",
                    }}
                    templateColumns={{ base: "auto", md: "1fr 1fr" }}
                    columnGap={8}
                    rowGap={{ base: 2, md: 0 }}
                    padding={10}
                >
                    <GridItem rowSpan={7}>
                        {isLoading ? (
                            <Skeleton height="100%"></Skeleton>
                        ) : (
                            <Image
                                src={coverImage || defaultBookCover}
                                borderRadius={10}
                                width={"100%"}
                                // marginX={"auto"}
                                // height="100%"
                                // overflow={"clip"}
                            />
                        )}
                    </GridItem>

                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent={{
                                base: "flex-start",
                                md: "flex-end",
                            }}
                            alignItems="center"
                            height="100%"
                        >
                            {" "}
                            {isLoggedIn && isAdmin && (
                                <Link to={`/books/${id}`}>
                                    <Button
                                        leftIcon={<BsPencilSquare />}
                                        colorScheme="facebook"
                                        marginTop={5}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                            )}
                        </Flex>
                    </GridItem>

                    <GridItem>
                        {" "}
                        <Flex alignItems="center" height="100%">
                            <Heading>{title}</Heading>
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
                            <Text>{author?.name}</Text>
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
                            <Text>{yearPublished}</Text>
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
                            <Text>{genre?.name}</Text>
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
                            {numberInStock > 0 ? (
                                <Badge
                                    colorScheme="green"
                                    paddingX={2}
                                    paddingY={{ md: 1 }}
                                >
                                    {`Available (${numberInStock} copies)`}
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
                            <Text>{rating}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem
                        marginTop={5}
                        colSpan={{ base: 1, md: 2 }}
                        border="blue.100"
                    >
                        <Heading size={"lg"}>Description</Heading>
                        <Divider marginY="2" />

                        <Text>{description}</Text>
                    </GridItem>
                </Grid>
            </Box>
        </GridItem>
    );
};

export default BookDetails;
