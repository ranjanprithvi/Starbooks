import { Box, GridItem } from "@chakra-ui/react";
import React from "react";
import Form from "./common/Form";

const BookForm = () => {
    return (
        <GridItem colSpan={2} marginX={5}>
            <Box
                marginX={"auto"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"800px"}
            >
                <Form />
            </Box>
        </GridItem>
    );
};

export default BookForm;
