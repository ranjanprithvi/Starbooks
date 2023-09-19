import React from "react";
import useData from "../hooks/useData";
import HttpService from "../services/http-service";
import bookService, { Book } from "../services/book-service";
import { SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";

const BookGrid = () => {
    const { data: books, isLoading, error } = useData<Book>(bookService);

    return (
        <div>
            {isLoading && <span className="loader"></span>}
            {error && <div>{error}</div>}
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
                padding="10px"
                spacing={10}
            >
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default BookGrid;
