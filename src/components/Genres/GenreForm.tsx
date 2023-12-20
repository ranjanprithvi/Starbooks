import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field, Option } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import HttpService from "../../services/http-service";
import { Genre } from "../../models/genre";
import useBooks from "../../hooks/useBooks";
import useUsers from "../../hooks/useUsers";

const schema = z.object({
    name: z
        .string({ invalid_type_error: "Genre name is required" })
        .nonempty({ message: "Genre name is required" }),
});

type GenreData = z.infer<typeof schema>;

const GenreForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const { books } = useBooks();
    const { users } = useUsers({ isAdmin: false });

    const resetDependencies = [users, books];

    if (id != "new") navigate("/not-found");

    const onSubmit = (data: GenreData) => {
        let genreService = new HttpService("/genres");
        genreService
            .post<GenreData, Genre>(data)
            .then((res) => {
                navigate("/genres", {
                    replace: true,
                });
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

    const fields: Field<GenreData>[] = [
        {
            type: "textInput",
            label: "Name",
            name: "name",
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
                <Form<GenreData>
                    resolver={resolver}
                    fields={fields}
                    heading={"New Genre"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default GenreForm;
