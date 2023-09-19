import React from "react";
import useData from "../hooks/useData";
import HttpService from "../services/http-service";
import bookService, { Book } from "../services/book-service";
import { SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

const BookGrid = () => {
    const { data: books, isLoading, error } = useData<Book>(bookService);
    const skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div>
            {error && <div>{error}</div>}
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
                padding="20px"
                spacing={5}
            >
                {isLoading &&
                    skeletonCards.map((skeleton) => (
                        <BookCardSkeleton key={skeleton} />
                    ))}

                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default BookGrid;
