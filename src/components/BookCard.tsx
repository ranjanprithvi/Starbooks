import React from "react";
import { Book } from "../services/book-service";
import {
    Card,
    CardBody,
    HStack,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import Rating from "./Rating";

interface Props {
    book: Book;
}

const BookCard = ({ book }: Props) => {
    return (
        <Card borderRadius={10} overflow="hidden">
            <Image
                src={
                    book.coverImage ||
                    "https://bookcart.azurewebsites.net/Upload/Default_image.jpg"
                }
                borderRadius={10}
                height="75%"
                // overflow={"clip"}
            />
            <CardBody>
                <Heading
                    marginY="5px"
                    fontSize="2xl"
                    maxHeight="60px"
                    overflow={"hidden"}
                >
                    {book.title}
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
