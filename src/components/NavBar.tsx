import { HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../assets/Logo.png";
import logoDark from "../assets/Logo-dark.png";
import ColourModeSwitch from "./ColourModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { colorMode } = useColorMode();
    return (
        <HStack justifyContent="space-between" padding="5">
            <Link to="/">
                {colorMode == "dark" ? (
                    <Image src={logoDark} height="10" />
                ) : (
                    <Image src={logo} height="10" />
                )}
            </Link>
            <ColourModeSwitch />
        </HStack>
    );
};

export default NavBar;
