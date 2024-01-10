import {
    Button,
    Divider,
    GridItem,
    HStack,
    Heading,
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import Table from "../common/Table";
import { Rental } from "../../models/rental";
import useRentals from "../../hooks/useRentals";
import _ from "lodash";
import { httpService } from "../../services/http-service";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import { useState } from "react";
import Modal from "../common/Modal";

export const handleReturned = async (rental: Rental, toast: any) => {
    let rentalService = httpService("/rentals/return");

    rentalService
        .patch<Rental, Rental>(rental, rental._id)
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err.response?.data?.toString(),
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
};

const Rentals = () => {
    const { rentals, isLoading, error } = useRentals();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rentalToReturn, setRentalToReturn] = useState<Rental>({} as Rental);

    if (error) {
        return null;
    }

    const rentalsData = rentals.map((rental) => ({
        _id: rental._id,
        rowData: {
            book: { value: rental.book.title },
            user: { value: rental.user.name },
            dateOut: {
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
                        <>
                            <Button
                                leftIcon={<AiOutlineRollback />}
                                colorScheme="teal"
                                size={"sm"}
                                alignItems={"center"}
                                onClick={() => {
                                    setRentalToReturn(rental);
                                    onOpen();
                                }}
                            >
                                Mark as Returned
                            </Button>
                        </>
                    );
                },
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
            <Modal
                header="Return"
                body="Are you sure you want to mark the book as returned?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="teal"
                            mr="3"
                            onClick={() =>
                                handleReturned(rentalToReturn, toast)
                            }
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <VStack
                border="2px"
                borderColor="gray.400"
                borderRadius={20}
                padding={10}
                width="100%"
            >
                <HStack
                    justifyContent="space-between"
                    width="100%"
                    paddingX="5"
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
                <Divider />
                <Table
                    headers={["Book", "User", "Date Out", "Returned"]}
                    data={rentalsData}
                    fontSize="sm"
                    isLoading={isLoading}
                ></Table>
            </VStack>
        </GridItem>
    );
};

export default Rentals;
