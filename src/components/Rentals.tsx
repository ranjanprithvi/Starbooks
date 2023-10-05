import {
    Button,
    GridItem,
    HStack,
    Heading,
    VStack,
    useToast,
} from "@chakra-ui/react";
import Table from "./common/Table";
import { Rental } from "../models/rental";
import useRentals from "../hooks/useRentals";
import _ from "lodash";
import { Book } from "../models/book";
import HttpService from "../services/http-service";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaPlus } from "react-icons/fa";

const Rentals = () => {
    const { rentals, setRentals, isLoading, error } = useRentals();
    const toast = useToast();
    const navigate = useNavigate();
    const screenSize = screenX;

    if (error) {
        console.log(error);
        return null;
    }

    const handleReturned = async (rental: Rental) => {
        let rentalService = new HttpService("/rentals/return");

        rentalService
            .update<Rental, Rental>(rental, rental._id)
            .then((res) => {
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
    const rentalsData = rentals.map((rental) => ({
        book: { value: rental.book.title },
        user: { value: rental.user.name },
        // dateReturned: {
        //     value: moment(rental.dateReturned).format("DD MMM YYYY"),
        // },
        _id: {
            value: moment(
                parseInt(rental._id.substring(0, 8), 16) * 1000
            ).format("DD MMM YYYY"),
        },
        dateReturned: {
            renderComponent: function () {
                return rental.dateReturned ? (
                    <div>
                        {moment(rental.dateReturned).format("DD MMM YYYY")}
                    </div>
                ) : (
                    <Button
                        size={"sm"}
                        colorScheme="red"
                        alignItems={"center"}
                        onClick={() => handleReturned(rental)}
                    >
                        Mark as Returned
                    </Button>
                );
            },
        },
    }));
    return (
        <GridItem
            colSpan={2}
            maxWidth="1240px"
            marginX="auto"
            paddingX="5"
            width="100%"
        >
            <VStack>
                <Table
                    headers={["Book", "User", "Date Out", "Returned"]}
                    heading={{
                        renderComponent: () => (
                            <HStack
                                justifyContent="space-between"
                                width="100%"
                                marginBottom={5}
                            >
                                <Heading>Rentals</Heading>
                                <Button
                                    as={Link}
                                    to="/rentals/new"
                                    leftIcon={<FaPlus />}
                                    colorScheme="green"
                                >
                                    New Rental
                                </Button>
                            </HStack>
                        ),
                    }}
                    data={rentalsData}
                    fontSize="sm"
                    isLoading={isLoading}
                ></Table>
            </VStack>
        </GridItem>
    );
};

export default Rentals;
