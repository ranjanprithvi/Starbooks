import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColourModeSwitch = ({ ...rest }) => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <HStack {...rest}>
            <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="teal"
            />

            <Text>Dark Mode</Text>
        </HStack>
    );
};

export default ColourModeSwitch;
