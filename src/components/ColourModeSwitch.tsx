import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColourModeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <HStack>
            <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="green"
            />

            <Text>Dark Mode</Text>
        </HStack>
    );
};

export default ColourModeSwitch;
