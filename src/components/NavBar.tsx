import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/Starbooks.png";
import ColourModeSwitch from "./ColourModeSwitch";

const NavBar = () => {
    return (
        <HStack justifyContent="space-between" padding="5">
            <Image src={logo} height={30} />
            <ColourModeSwitch />
        </HStack>
    );
};

export default NavBar;
