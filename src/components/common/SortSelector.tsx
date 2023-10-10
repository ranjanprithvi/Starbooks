import {
    Button,
    Divider,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

export interface Sort {
    [key: string]: string;
}

interface Props {
    sortBy: Sort;
    sortFields: Sort[];
    onSort: (sortField: Sort) => void;
    size?: string;
}

const SortSelector = ({
    sortBy: sortField,
    sortFields,
    onSort,
    size,
}: Props) => {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />} size="sm">
                {"Order By: " + sortField.name}
            </MenuButton>

            <MenuList>
                {sortFields.map((field) => (
                    <MenuItem key={field.name} onClick={() => onSort(field)}>
                        {field.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default SortSelector;
