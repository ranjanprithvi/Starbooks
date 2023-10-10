import {
    Button,
    HStack,
    Image,
    LinkBox,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Show,
    Icon,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
} from "@chakra-ui/react";
import logo from "../assets/Logo.png";
import ColourModeSwitch from "./ColourModeSwitch";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { LoginContext } from "../contexts/loginContext";
import { TbLogout } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaHamburger, FaUser } from "react-icons/fa";
import Modal from "./common/Modal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconBase } from "react-icons/lib";
import { AiOutlineMenu } from "react-icons/ai";

interface NavItem {
    label: string;
    path: string;
}

const NavBar = () => {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const btnRef = useRef(null);

    const { isLoggedIn, setLoggedIn, isAdmin, setAdmin } =
        useContext(LoginContext);

    let navLinks = [] as NavItem[];
    navLinks = [
        { label: "Home", path: "/" },
        { label: "Books", path: "/books" },
    ];
    if (isLoggedIn && isAdmin)
        navLinks.push(
            { label: "Users", path: "/users" },
            { label: "Rentals", path: "/rentals" }
        );

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
        <>
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="teal"
                            mr={3}
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
            <Drawer
                isOpen={isDrawerOpen}
                placement="top"
                onClose={onDrawerClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent width="150vw">
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onDrawerClose}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <HStack justifyContent="space-between" padding="5">
                <HStack>
                    <Show below="sm">
                        <Button
                            ref={btnRef}
                            onClick={onDrawerOpen}
                            background={"transparent"}
                            height="20px"
                            marginLeft="-5px"
                            padding="0"
                        >
                            <RxHamburgerMenu size="32px"></RxHamburgerMenu>
                        </Button>
                    </Show>
                    <Link to="/">
                        <Image src={logo} height={{ base: "12", md: "14" }} />
                    </Link>
                </HStack>
                <HStack>
                    <Show above="md">
                        {navLinks.map((link) => (
                            <LinkBox
                                key={link.path}
                                color={
                                    pathname == link.path ? "teal.400" : "gray"
                                }
                                marginRight={{ md: 7 }}
                            >
                                <NavLink to={link.path}>{link.label}</NavLink>
                            </LinkBox>
                        ))}
                    </Show>

                    <ColourModeSwitch marginRight="5" />
                    <Show above="md">
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
                                            My Profile
                                        </MenuItem>
                                    )}
                                    <MenuItem
                                        icon={<TbLogout />}
                                        onClick={onOpen}
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
                    </Show>
                </HStack>
            </HStack>
        </>
    );
};

export default NavBar;
