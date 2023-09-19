import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const BookCard = () => {
    return (
        <Card borderRadius={10} overflow="hidden">
            <CardBody>
                <Skeleton height="400px"></Skeleton>
                <SkeletonText></SkeletonText>
            </CardBody>
        </Card>
    );
};

export default BookCard;
