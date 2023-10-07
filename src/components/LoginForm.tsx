import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "./common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import HttpService from "../services/http-service";

const schema = z.object({
    email: z
        .string({ invalid_type_error: "Book is required" })
        .email({ message: "Invalid email" })
        .nonempty({ message: "Book is required" }),
    password: z
        .string({ invalid_type_error: "User is required" })
        .nonempty({ message: "User is required" }),
});

type LoginData = z.infer<typeof schema>;

interface LoginResponse {
    token: string;
    isAdmin: boolean;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { setLoggedIn, setAdmin } = useContext(LoginContext);

    const resolver = zodResolver(schema);

    const fields: Field<LoginData>[] = [
        {
            type: "textInput",
            label: "Email",
            name: "email",
        },
        {
            type: "textInput",
            label: "Password",
            name: "password",
            inputType: "password",
        },
    ];

    const onLogin = (data: LoginData) => {
        const authService = new HttpService("/auth/login");
        authService
            .post<LoginData, LoginResponse>(data)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "isAdmin",
                    response.data.isAdmin.toString()
                );
                setLoggedIn(true);
                setAdmin(response.data.isAdmin);
                window.location.replace("/books");
                // navigate("/books");
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

    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Box
                marginX={"auto"}
                marginTop="5%"
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<LoginData>
                    resolver={resolver}
                    fields={fields}
                    heading={"Login"}
                    onSubmit={onLogin}
                />
            </Box>
        </GridItem>
    );
};

export default LoginForm;
