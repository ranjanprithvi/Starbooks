import {
    Heading,
    VStack,
    Image,
    GridItem,
    Box,
    HStack,
} from "@chakra-ui/react";
import logo from "../assets/Logo.png";

const Home = () => {
    return (
        <GridItem colSpan={2}>
            <VStack
                height="100%"
                width="53vw"
                justifyContent="center"
                marginX="auto"
            >
                <Image src={logo} height="48" />
                <Heading>Welcome to Starbooks!</Heading>
                <VStack>
                    <Box>
                        Starbooks is a library management app where visitors can
                        view the books catalog, members can view their details
                        and active rentals after logging in, and admins can
                        manage the books catalog, users, and rentals.
                    </Box>
                    <br></br>
                    <Box>Please use the following credentials to login:</Box>
                </VStack>
                <HStack justifyContent="space-around" width="100%">
                    <VStack>
                        <Box fontWeight="bold">Admin</Box>
                        <Box>
                            Email: Admin1@starbooks.com
                            <br></br>
                            Password: Admin1@starbooks.com
                        </Box>
                    </VStack>
                    <VStack>
                        <Box fontWeight="bold">Member</Box>
                        <Box>
                            Email: User3@starbooks.com
                            <br></br>
                            Password: User3@starbooks.com
                        </Box>
                    </VStack>
                </HStack>
            </VStack>
        </GridItem>
    );
};

export default Home;
