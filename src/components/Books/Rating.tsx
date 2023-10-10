import React from "react";
import { Badge } from "@chakra-ui/react";

interface Props {
    rating: number;
}

const Rating = ({ rating }: Props) => {
    const colour =
        rating >= 4
            ? "green"
            : rating >= 3.5
            ? "orange"
            : rating >= 3
            ? "yellow"
            : "";

    return (
        <Badge
            fontSize={14}
            paddingX={2}
            borderRadius="4px"
            colorScheme={colour}
        >
            {rating}
        </Badge>
    );
};

export default Rating;
