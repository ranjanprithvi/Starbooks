import {
    Box,
    Button,
    HStack,
    Image,
    LinkBox,
    useColorMode,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/Logo.png";
import logoDark from "../assets/Logo-dark.png";
import ColourModeSwitch from "./ColourModeSwitch";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import { TbLogout } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { handleReturned } from "./Rentals";
import Modal from "./common/Modal";

interface NavItem {
    label: string;
    path: string;
}

const NavBar = () => {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isLoggedIn, setLoggedIn, isAdmin, setAdmin } =
        useContext(LoginContext);

    let navLinks = [] as NavItem[];
    if (isLoggedIn) {
        navLinks = [{ label: "Books", path: "/books" }];
        if (isAdmin)
            navLinks.push(
                { label: "Users", path: "/users" },
                { label: "Rentals", path: "/rentals" }
            );
    }

    const logout = (
        setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
        setAdmin: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        setLoggedIn(false);
        setAdmin(false);
    };

    return (
        <HStack justifyContent="space-between" padding="5">
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                logout(setLoggedIn, setAdmin);
                                window.location.assign("/books");
                            }}
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Link to="/books">
                <Image src={logo} height="14" marginY="-5" />
            </Link>
            <HStack>
                {navLinks.map((link) => (
                    <LinkBox
                        key={link.path}
                        color={pathname == link.path ? "teal.400" : "gray"}
                        marginRight={{ md: 7 }}
                    >
                        <NavLink to={link.path}>{link.label}</NavLink>
                    </LinkBox>
                ))}

                <ColourModeSwitch marginRight="5" />
                {isLoggedIn ? (
                    <Menu>
                        <MenuButton
                            as={Button}
                            leftIcon={<BiSolidUserCircle />}
                            rightIcon={<BsChevronDown />}
                        >
                            Account
                        </MenuButton>
                        <MenuList>
                            {isLoggedIn && !isAdmin && (
                                <MenuItem
                                    as={Link}
                                    to={"/userDetails/me"}
                                    icon={<FaUser />}
                                >
                                    Overview
                                </MenuItem>
                            )}
                            <MenuItem icon={<TbLogout />} onClick={onOpen}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Button
                        as={ChakraLink}
                        href="/login"
                        colorScheme="teal"
                        variant="outline"
                    >
                        Login
                    </Button>
                )}
            </HStack>
        </HStack>
    );
};

export default NavBar;
