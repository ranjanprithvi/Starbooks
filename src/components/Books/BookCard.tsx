import { Card, CardBody, HStack, Heading, Image, Text } from "@chakra-ui/react";
import Rating from "./Rating";
import { Book, defaultBookCover } from "../../models/book";

interface Props {
    book: Book;
}

const BookCard = ({ book }: Props) => {
    return (
        <Card
            height={"100%"}
            borderRadius={10}
            overflow="hidden"
            boxShadow={"2xl"}
        >
            <Image
                src={book.coverImage || defaultBookCover}
                borderRadius={10}
                height="75%"
                // overflow={"clip"}
            />
            <CardBody>
                <Heading marginY="5px" fontSize="xl">
                    {book.title +
                        (book.yearPublished ? ` (${book.yearPublished})` : "")}
                </Heading>
                <HStack justifyContent={"space-between"}>
                    <Text color={"gray.500"}>{book.author.name}</Text>
                    <Rating rating={book.rating} />
                </HStack>
            </CardBody>
        </Card>
    );
};

export default BookCard;
