import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field, Option } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthors from "../../hooks/useAuthors";
import useGenres from "../../hooks/useGenres";
import useBook from "../../hooks/useBook";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { Book } from "../../models/book";
import HttpService from "../../services/http-service";

const schema = z.object({
    title: z
        .string({ invalid_type_error: "Title is required" })
        .nonempty({ message: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters long" }),
    author: z
        .string({ invalid_type_error: "Author is required" })
        .nonempty({ message: "Author is required" }),
    genre: z
        .string({ invalid_type_error: "Genre is required" })
        .nonempty({ message: "Genre is required" }),
    yearPublished: z
        .number({ invalid_type_error: "Year published is required" })
        .nonnegative({ message: "Year published must be a positive number" })
        .int({ message: "Year published must be a whole number" })
        .max(new Date().getFullYear(), {
            message:
                "Year published must be less than or equal to current year",
        }),
    rating: z
        .union([
            z
                .number()
                .multipleOf(0.01)
                .min(0, { message: "Rating must be between 0 and 5" })
                .max(5, {
                    message: "Rating must be between 0 and 5",
                }),
            z.nan(),
        ])
        .optional(),
    numberInStock: z
        .union([
            z
                .number()
                .int({ message: "Number in Stock must be a whole number" })
                .nonnegative({
                    message: "Number in Stock must be non-negative",
                }),
            z.nan(),
        ])
        .optional(),
    coverImage: z.union([
        z.string().url({ message: "Cover image must be a valid URL" }),
        z.literal(""),
    ]),
    description: z.string().optional(),
});

type BookData = z.infer<typeof schema>;

const BookForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const { authors } = useAuthors();
    const { genres } = useGenres();
    const { book, error } = useBook(id);

    const resetObject = {
        ..._.pick(book, [
            "title",
            "yearPublished",
            "rating",
            "numberInStock",
            "coverImage",
            "description",
        ]),
        author: book.author?._id,
        genre: book.genre?._id,
    };

    // if (!error) {
    //     values = {
    //         ..._.pick(book, _.keys(schema.shape)),
    //         authorId: book.author?._id,
    //         genreId: book.genre?._id,
    //     } as BookData;
    // }

    if (error && id != "new") navigate("/not-found");

    const onSubmit = (data: BookData) => {
        let bookService = new HttpService("/books");

        let promise: Promise<{ data: Book }>;
        if (id == "new") {
            data = _.omitBy(data, (value) => !value) as BookData;
            promise = bookService.post<BookData, Book>(data);
        } else {
            Number.isNaN(data.rating) && (data.rating = 0);
            Number.isNaN(data.numberInStock) && (data.numberInStock = 0);

            promise = bookService.patch<BookData, Book>(data, id);
        }

        promise
            .then((res) => {
                navigate("/bookDetails/" + res.data._id, {
                    replace: true,
                });
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description:
                        err.response?.data || "Sorry. Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const fields: Field<BookData>[] = [
        { type: "textInput", label: "Title", name: "title" },
        {
            type: "select",
            label: "Author",
            name: "author",
            options: authors.map(
                (author) =>
                    ({ value: author._id, label: author.name } as Option)
            ),
            placeholder: "--Select author--",
        },
        {
            type: "select",
            label: "Genre",
            name: "genre",
            options: genres.map(
                (genre) => ({ value: genre._id, label: genre.name } as Option)
            ),
            placeholder: "--Select genre--",
        },
        {
            type: "textInput",
            label: "Year Published",
            name: "yearPublished",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Rating",
            name: "rating",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Number in Stock",
            name: "numberInStock",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Cover Image",
            name: "coverImage",
            inputType: "url",
        },
        {
            type: "textArea",
            label: "Description",
            name: "description",
        },
    ];

    return (
        <GridItem colSpan={2} marginX={5}>
            <Box
                marginX={"auto"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<BookData>
                    resolver={resolver}
                    fields={fields}
                    heading={id === "new" ? "New Book" : "Edit Book"}
                    onSubmit={onSubmit}
                    resetObject={resetObject}
                    resetDependencies={[book]}
                />
            </Box>
        </GridItem>
    );
};

export default BookForm;
