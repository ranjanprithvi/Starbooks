import {
    Table as ChakraTable,
    TableContainer,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Button,
    VStack,
    Spinner,
    Divider,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Entity } from "../../services/http-service";
import { head } from "lodash";

export interface TableRowData {
    value?: string | number | boolean;
    renderComponent?: () => ReactNode;
}

interface Props {
    data: Record<string, TableRowData>[];
    heading?: TableRowData;
    headers: string[];
    fontSize?: string;
    isLoading?: boolean;
}

const Table = ({ heading, data, headers, isLoading, ...rest }: Props) => {
    return (
        <TableContainer
            border="2px"
            borderColor="gray.400"
            borderRadius={20}
            padding={10}
            width="100%"
            {...rest}
        >
            <VStack>
                {heading?.value && <TableCaption>{heading.value}</TableCaption>}
                {heading?.renderComponent && heading.renderComponent()}
                <Divider />
                {isLoading ? (
                    <Spinner />
                ) : (
                    <ChakraTable variant="simple">
                        {/* <TableCaption>{heading}</TableCaption> */}
                        <Thead>
                            <Tr>
                                {headers.map((header) => (
                                    <Th key={header}>{header}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((row) => {
                                console.log(row);
                                return (
                                    <Tr key={row._id.value?.toString()}>
                                        {Object.keys(row).map((key) => (
                                            <Td key={key}>
                                                {row[key].value
                                                    ? row[key].value
                                                    : row[
                                                          key
                                                      ].renderComponent?.()}
                                            </Td>
                                        ))}
                                    </Tr>
                                );
                            })}
                            {/* <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr> */}
                        </Tbody>
                    </ChakraTable>
                )}
            </VStack>
        </TableContainer>
    );
};

export default Table;
