import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Spinner,
    Text,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import moment from "moment";
import Table from "./common/Table";
import { handleReturned } from "./Rentals";
import { FaPlus } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

const UserDetails = () => {
    const { id } = useParams();
    const toast = useToast();

    const { user, isLoading, error } = useUser(id);

    if (error) return <Text>User Not Found!</Text>;
    if (isLoading) return <Spinner />;

    console.log(user);
    const tableData = user?.activeRentals?.map((rental) => {
        return {
            _id: rental._id,
            rowData: {
                book: { value: rental.book?.title },
                dateOut: {
                    value: moment(
                        parseInt(rental._id.substring(0, 8), 16) * 1000
                    ).format("DD MMM YYYY"),
                },
                dateReturned: {
                    renderComponent: function () {
                        return rental.dateReturned ? (
                            <div>
                                {moment(rental.dateReturned).format(
                                    "DD MMM YYYY"
                                )}
                            </div>
                        ) : (
                            <Button
                                leftIcon={<AiOutlineRollback />}
                                colorScheme="red"
                                size={"sm"}
                                alignItems={"center"}
                                onClick={() => handleReturned(rental, toast)}
                            >
                                Mark as Returned
                            </Button>
                        );
                    },
                },
            },
        };
    });

    console.log(tableData);

    return (
        <GridItem colSpan={2} marginBottom={5} maxWidth="1280px" marginX="auto">
            <Box
                marginX={"5"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
            >
                <Grid
                    minWidth={{ sm: "0", md: "600px" }}
                    width={"100%"}
                    templateRows="100px repeat(5,50px) auto"
                    rowGap={2}
                    padding={{ base: 5, md: 10 }}
                >
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            height="100%"
                        >
                            <Flex alignItems="center" height="100%">
                                <Heading size="2xl">{user.name}</Heading>
                            </Flex>

                            <Link to={`/users/${id}`}>
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
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Email </Text>{" "}
                            <Text>{user?.email}</Text>
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
                            <Text fontWeight="bold">Phone Number</Text>{" "}
                            <Text>
                                {"+" +
                                    user.countryCode +
                                    " " +
                                    (user?.phoneNumber
                                        ? user?.phoneNumber.toString()
                                        : "")}
                            </Text>
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
                            <Text fontWeight="bold">Date of Birth: </Text>{" "}
                            <Text>
                                {moment(user.dateOfBirth).format("DD MMM YYYY")}
                            </Text>
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
                            <Text fontWeight="bold">Membership Expiry: </Text>{" "}
                            {user?.membershipExpiry && (
                                <Text
                                    color={
                                        new Date(user.membershipExpiry) <
                                        new Date()
                                            ? "red"
                                            : "green"
                                    }
                                >
                                    {moment(user.membershipExpiry).format(
                                        "DD MMM YYYY"
                                    )}
                                </Text>
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
                            <Text fontWeight="bold">Max Borrow: </Text>{" "}
                            <Text>{user.maxBorrow}</Text>
                        </Flex>
                    </GridItem>

                    <Divider />
                    <GridItem marginTop={10} border="blue.100">
                        <HStack justifyContent="space-between">
                            <Heading size={"lg"}>Active Rentals</Heading>
                            <Tooltip
                                label={
                                    user.activeRentals?.length >= user.maxBorrow
                                        ? "Max Borrow Limit Reached"
                                        : ""
                                }
                            >
                                {/* <Link
                                    to={`/rentals/new?user=${user._id}`}
                                    isDisabled={
                                        user.activeRentals?.length >=
                                        user.maxBorrow
                                    }
                                > */}
                                <Button
                                    size="sm"
                                    as={Link}
                                    to={`/rentals/new?user=${user._id}`}
                                    onClick={(event) => {
                                        if (
                                            user.activeRentals?.length >=
                                            user.maxBorrow
                                        )
                                            event.preventDefault();
                                    }}
                                    leftIcon={<FaPlus />}
                                    color="blue.700"
                                    backgroundColor="blue.100"
                                    isDisabled={
                                        user.activeRentals?.length >=
                                        user.maxBorrow
                                    }
                                >
                                    New Rental
                                </Button>
                                {/* </Link> */}
                            </Tooltip>
                        </HStack>
                        <Divider marginY="2" />

                        {tableData && (
                            <Table
                                data={tableData}
                                headers={["Book", "Date Out", "Returned"]}
                                isLoading={isLoading}
                                fontSize="sm"
                            ></Table>
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </GridItem>
    );
};

export default UserDetails;
