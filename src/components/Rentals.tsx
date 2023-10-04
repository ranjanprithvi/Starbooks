import { Button, GridItem, useToast } from "@chakra-ui/react";
import Table from "./common/Table";
import { Rental } from "../models/rental";
import useRentals from "../hooks/useRentals";
import _ from "lodash";
import { Book } from "../models/book";
import HttpService from "../services/http-service";
import { useNavigate } from "react-router-dom";

const Rentals = () => {
    const { rentals, setRentals, error } = useRentals();
    const toast = useToast();
    const navigate = useNavigate();

    if (error) {
        console.log(error);
        return null;
    }

    const handleReturned = async (rental: Rental) => {
        let rentalService = new HttpService("/rentals/return");

        let promise: Promise<{ data: Rental }>;
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
        _id: { value: rental._id },
        book: { value: rental.book.title },
        user: { value: rental.user.name },
        dateReturned: { value: rental.dateReturned?.toString() },
        markReturned: {
            renderComponent: function () {
                return rental.dateReturned ? null : (
                    <Button
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
        <GridItem colSpan={2} maxWidth="1240px" marginX="auto">
            <Table
                headers={[
                    "Date Rented",
                    "Book",
                    "User",
                    "Date Returned",
                    "Return",
                ]}
                data={rentalsData}
            ></Table>
        </GridItem>
    );
};

export default Rentals;
