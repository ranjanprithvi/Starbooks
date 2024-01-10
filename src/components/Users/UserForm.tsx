import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { httpService } from "../../services/http-service";
import { User } from "../../models/user";
import useUser from "../../hooks/useUser";
import moment from "moment";

const schemaObject = {
    name: z
        .string({ invalid_type_error: "Name is required" })
        .nonempty({ message: "Name is required" }),
    email: z
        .string({ invalid_type_error: "Email is required" })
        .nonempty({ message: "Email is required" }),
    countryCode: z
        .union([
            z
                .number()
                .min(0, { message: "Country Code must be between 0 and 200" })
                .max(999, {
                    message: "Country Code must be between 0 and 200",
                }),
            z.nan(),
        ])
        .optional(),
    phoneNumber: z
        .union([
            z
                .number()
                .min(0, {
                    message: "Phone Number must must be between positive",
                })
                .max(99999999999, {
                    message: "Phone number should be less than 11 digits",
                }),
            z.nan(),
        ])
        .optional(),
    membershipExpiry: z.string({
        invalid_type_error: "Membership expiry is required",
    }),
    dateOfBirth: z.string().optional(),
    maxBorrow: z.number().optional(),
};
const schema = z.object(schemaObject);

type UserData = z.infer<typeof schema>;
_.omit(schema.shape, ["countryCode", "phoneNumber"]);
const schemaDTO = z.object(
    _.omit(schemaObject, ["countryCode", "phoneNumber"])
);

type UserDTO = z.infer<typeof schemaDTO> & {
    countryCode: string | undefined;
    phoneNumber: string | undefined;
};

const UserForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    if (!id) return null;

    const resolver = zodResolver(schema);

    const { user, error } = useUser(id);

    const resetObject = {
        name: user.name,
        email: user.email,
        countryCode: parseInt(user.countryCode),
        phoneNumber: parseInt(user.phoneNumber),
        dateOfBirth: moment(new Date(user.dateOfBirth || "")).format(
            "YYYY-MM-DD"
        ),
        membershipExpiry: moment(new Date(user.membershipExpiry || "")).format(
            "YYYY-MM-DD"
        ),
        maxBorrow: user.maxBorrow,
    };

    if (error) navigate("/not-found");

    const onSubmit = (data: UserData) => {
        const dataDTO = {
            ...data,
            countryCode: data.countryCode?.toString(),
            phoneNumber: data.phoneNumber?.toString(),
        } as UserDTO;
        let userService = httpService("/users");
        let promise;
        if (id == "new") {
            data = _.omitBy(data, (value) => {
                return !value || value === "Invalid date";
            }) as UserData;
            promise = userService.post<UserDTO, User>(dataDTO);
        } else {
            data = _.omitBy(
                data,
                (value) => value === "Invalid date"
            ) as UserData;
            promise = userService.patch<UserDTO, User>(dataDTO, id);
        }

        promise
            .then((res) => {
                navigate("/users", {
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

    const fields: Field<UserData>[] = [
        {
            type: "textInput",
            label: "Name",
            name: "name",
        },
        {
            type: "textInput",
            label: "Email",
            name: "email",
        },
        {
            type: "textInput",
            label: "Country Code",
            name: "countryCode",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Phone",
            name: "phoneNumber",
            inputType: "number",
        },
        {
            type: "textInput",
            label: "Date of Birth",
            name: "dateOfBirth",
            inputType: "date",
        },
        {
            type: "textInput",
            label: "Membership Expiry",
            name: "membershipExpiry",
            inputType: "date",
        },
        {
            type: "textInput",
            label: "Book Limit",
            name: "maxBorrow",
            inputType: "number",
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
                <Form<UserData>
                    resolver={resolver}
                    fields={fields}
                    heading={id == "new" ? "New User" : "Edit User"}
                    onSubmit={onSubmit}
                    resetObject={resetObject}
                    resetDependencies={[user]}
                />
            </Box>
        </GridItem>
    );
};

export default UserForm;
