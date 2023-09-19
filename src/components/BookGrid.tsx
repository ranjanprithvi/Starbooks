import React from "react";
import useData from "../hooks/useData";
import HttpService from "../services/http-service";
import bookService, { Book } from "../services/book-service";
import { SimpleGrid, filter } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { Genre } from "../services/genre-service";

interface Props {
    selectedGenre: Genre | null;
}

const BookGrid = ({ selectedGenre }: Props) => {
    const { data: books, isLoading, error } = useData<Book>(bookService);
    const skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let filteredBooks = books;

    if (selectedGenre) {
        filteredBooks = books.filter(
            (book) => book.genre._id === selectedGenre._id
        );
    }

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

                {filteredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default BookGrid;
