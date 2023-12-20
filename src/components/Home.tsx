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
        <GridItem colSpan={2} height="100%">
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
                </VStack>
            </VStack>
        </GridItem>
    );
};

export default Home;
