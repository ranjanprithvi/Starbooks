import { SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import useBooks from "../../hooks/useBooks";
import { Link } from "react-router-dom";
import { BookQuery } from "../../models/book";

interface Props {
    queryObject: BookQuery;
}

const BookGrid = ({ queryObject }: Props) => {
    const { books, isLoading, error } = useBooks(queryObject, [
        queryObject.genre,
        queryObject.author,
        queryObject.search,
        queryObject.sortBy,
    ]);
    const skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // let filteredBooks = books;

    // if (selectedGenre) {
    //     filteredBooks = books.filter(
    //         (book) => book.genre._id === selectedGenre._id
    //     );
    // }

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
                    <Link to={`/bookDetails/${book._id}`} key={book._id}>
                        <BookCard key={book._id} book={book} />
                    </Link>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default BookGrid;
