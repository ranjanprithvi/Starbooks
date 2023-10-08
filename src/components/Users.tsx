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
    useDisclosure,
    useToast,
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
import { useState } from "react";
import { Rental } from "../models/rental";
import Modal from "./common/Modal";

const Users = () => {
    const { users, isLoading, error } = useUsers({ isAdmin: false });
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userToDelete, setUserToDelete] = useState<User>({} as User);

    if (error) {
        console.log(error);
        return null;
    }

    function handleDelete(user: User, toast: any) {
        console.log(user.name, "marked for deletion");
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
                        <Menu>
                            <MenuButton
                                as={Button}
                                type="button"
                                rightIcon={<BsChevronDown />}
                                background={"transparent"}
                            ></MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to={`/users/${user._id}`}>
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setUserToDelete(user);
                                        onOpen();
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        {/* <Button
                            leftIcon={<TbTrash></TbTrash>}
                            colorScheme="red"
                            onClick={() => handleDelete(user)}
                        >
                            Delete
                        </Button> */}
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
            <Modal
                header="Delete User"
                body="This functionality has been disabled for the demo."
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        {/* <Button
                            colorScheme="teal"
                            mr="3"
                            onClick={() => handleDelete(userToDelete, toast)}
                        >
                            Yes
                        </Button> */}
                        <Button colorScheme="teal" onClick={onClose}>
                            Ok
                        </Button>
                    </>
                )}
            ></Modal>
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
