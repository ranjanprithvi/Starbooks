import {
    Box,
    Button,
    HStack,
    Image,
    LinkBox,
    useColorMode,
    Link as ChakraLink,
} from "@chakra-ui/react";
import logo from "../assets/Logo.png";
import logoDark from "../assets/Logo-dark.png";
import ColourModeSwitch from "./ColourModeSwitch";
import { NavLink, Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const { pathname } = useLocation();
    const { colorMode } = useColorMode();

    const navLinks = [
        { label: "Books", path: "/books" },
        { label: "Users", path: "/users" },
        { label: "Rentals", path: "/rentals" },
    ];

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

                <ColourModeSwitch />
            </HStack>
        </HStack>
    );
};

export default NavBar;
