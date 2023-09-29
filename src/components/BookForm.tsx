import { Box, GridItem } from "@chakra-ui/react";
import Form, { Field, Option } from "./common/Form";
import { nan, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthors from "../hooks/useAuthors";
import useGenres from "../hooks/useGenres";
import useBook from "../hooks/useBook";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

const schema = z.object({
    title: z
        .string({ invalid_type_error: "Title is required" })
        .nonempty({ message: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters long" }),
    authorId: z
        .string({ invalid_type_error: "Author is required" })
        .nonempty({ message: "Author is required" }),
    genreId: z
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
    coverImage: z
        .union([
            z.string().url({ message: "Cover image must be a valid URL" }),
            z.undefined(),
        ])
        .optional(),
    description: z.string().optional(),
});

type BookData = z.infer<typeof schema>;

const BookForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) return null;

    const { authors } = useAuthors();
    const { genres } = useGenres();
    const { book, error } = useBook(id);

    if (error && id != "new") navigate("/not-found");

    const resolver = zodResolver(schema);

    const fields: Field<BookData>[] = [
        { type: "input", label: "Title", name: "title" },
        {
            type: "select",
            label: "Author",
            name: "authorId",
            options: authors.map(
                (author) =>
                    ({ value: author._id, label: author.name } as Option)
            ),
            placeholder: "--Select author--",
        },
        {
            type: "select",
            label: "Genre",
            name: "genreId",
            options: genres.map(
                (genre) => ({ value: genre._id, label: genre.name } as Option)
            ),
            placeholder: "--Select genre--",
        },
        {
            type: "input",
            label: "Year Published",
            name: "yearPublished",
            inputType: "number",
        },
        {
            type: "input",
            label: "Rating",
            name: "rating",
            inputType: "number",
        },
        {
            type: "input",
            label: "Number in Stock",
            name: "numberInStock",
            inputType: "number",
        },
        {
            type: "input",
            label: "Cover Image",
            name: "coverImage",
            inputType: "url",
        },
        {
            type: "input",
            label: "Description",
            name: "description",
        },
    ];

    let values;
    if (!error) {
        values = {
            ..._.pick(book, _.keys(schema.shape)),
            authorId: book.author?._id,
            genreId: book.genre?._id,
        } as BookData;
    }
    console.log(values);

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
                    values={values}
                />
            </Box>
        </GridItem>
    );
};

export default BookForm;
