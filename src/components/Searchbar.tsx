import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
    setSearch: (search: string) => void;
}

const Searchbar = ({ setSearch }: Props) => {
    return (
        <InputGroup borderRadius={5} size="sm">
            <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="gray.600" />}
            />
            <Input
                type="text"
                placeholder="Search Books..."
                border="1px solid #949494"
                onChange={_.debounce((e) => setSearch(e.target.value), 500)}
            />
        </InputGroup>
    );
};

export default Searchbar;
