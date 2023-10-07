import {
    Table as ChakraTable,
    TableContainer,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    VStack,
    Spinner,
    Divider,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import _ from "lodash";

export interface TableRowData {
    value?: string | number | boolean;
    renderComponent?: () => ReactNode;
}

export interface TableData {
    _id: string;
    rowData: { [key: string]: TableRowData | undefined };
}

interface Props {
    data: TableData[];
    headers: string[];
    fontSize?: string;
    isLoading?: boolean;
}

const Table = ({ data, headers, isLoading, ...rest }: Props) => {
    return (
        <TableContainer width="100%">
            <VStack>
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
                            {data.map((rowObject) => {
                                return (
                                    <Tr key={rowObject._id}>
                                        {Object.keys(rowObject.rowData).map(
                                            (key) => (
                                                <Td key={key}>
                                                    {rowObject.rowData[key]
                                                        ?.value
                                                        ? rowObject.rowData[key]
                                                              ?.value
                                                        : rowObject.rowData[
                                                              key
                                                          ]?.renderComponent?.()}
                                                </Td>
                                            )
                                        )}
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
