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

interface NavItem {
    label: string;
    path: string;
}

const logout = (
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>
) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
    setAdmin(false);
    window.location.assign("/books");
};

const NavBar = () => {
    const { pathname } = useLocation();
    const { colorMode } = useColorMode();
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

    return (
        <HStack justifyContent="space-between" padding="5">
            <Link to="/books">
                <Image
                    src={colorMode == "dark" ? logoDark : logo}
                    height="10"
                />
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
                            <MenuItem
                                icon={<TbLogout />}
                                onClick={() => logout(setLoggedIn, setAdmin)}
                            >
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
