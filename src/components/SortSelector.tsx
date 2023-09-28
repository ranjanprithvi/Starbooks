import {
    Button,
    Divider,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { BookSort, bookSortFields } from "../services/book-service";

interface Props {
    sortField: BookSort;
    onSort: (sortField: BookSort) => void;
}

const SortSelector = ({ sortField, onSort }: Props) => {
    const sortFields = [...bookSortFields];

    return (
        <Menu>
            <MenuButton marginX="5" as={Button} rightIcon={<BsChevronDown />}>
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
