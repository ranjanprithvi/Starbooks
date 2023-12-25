import { useToast as useChakraToast } from "@chakra-ui/react";

export function useToast() {
    const toast = useChakraToast();

    const showError = (message: string) => {
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };

    const showSuccess = (message: string) => {
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return { showError, showSuccess };
}
