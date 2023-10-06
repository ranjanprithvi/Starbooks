import {
    Box,
    Button,
    Divider,
    GridItem,
    HStack,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack,
} from "@chakra-ui/react";
import Table from "./common/Table";
import useUsers from "../hooks/useUsers";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye, FaPlus, FaUser } from "react-icons/fa";
import { BsChevronDown, BsEye } from "react-icons/bs";
import { User } from "../models/user";
import { TbTrash } from "react-icons/tb";

const Users = () => {
    const { users, isLoading, error } = useUsers({ isAdmin: false });

    if (error) {
        console.log(error);
        return null;
    }

    function handleDelete(user: User) {
        console.log(user, "marked for deletion");
    }

    const usersData = users.map((user) => ({
        _id: user._id,
        rowData: {
            name: {
                renderComponent: () => (
                    <HStack>
                        <FaUser />
                        <>{user.name}</>
                    </HStack>
                ),
            },
            // name: { value: user.name },
            email: { value: user.email },
            // dateReturned: {
            //     value: moment(user.dateReturned).format("DD MMM YYYY"),
            // },
            membershipExpiry: {
                value: moment(user.membershipExpiry).format("DD MMM YYYY"),
            },
            actions: {
                renderComponent: () => (
                    <HStack>
                        <Button
                            leftIcon={<FaEye />}
                            as={Link}
                            to={`/userDetails/${user._id}`}
                        >
                            View
                        </Button>
                        <Button
                            leftIcon={<TbTrash></TbTrash>}
                            colorScheme="red"
                            onClick={() => handleDelete(user)}
                        >
                            Delete
                        </Button>
                    </HStack>
                ),
            },
        },
    }));
    return (
        <GridItem
            colSpan={2}
            maxWidth="1240px"
            marginX="auto"
            paddingX="5"
            width="100%"
        >
            <VStack
                border="2px"
                borderColor="gray.400"
                borderRadius={20}
                padding={10}
                width="100%"
            >
                <HStack
                    justifyContent="space-between"
                    width="100%"
                    paddingX="5"
                    marginBottom={5}
                >
                    <Heading>Users</Heading>
                    <Button
                        as={Link}
                        to="/users/new"
                        leftIcon={<FaPlus />}
                        colorScheme="green"
                    >
                        New User
                    </Button>
                </HStack>
                <Divider />

                <Table
                    headers={["Name", "Email", "Membership Expiry", ""]}
                    data={usersData}
                    fontSize="sm"
                    isLoading={isLoading}
                ></Table>
            </VStack>
        </GridItem>
    );
};

export default Users;
