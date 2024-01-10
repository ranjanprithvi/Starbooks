import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const BookCardSkeleton = () => {
    return (
        <Card
            borderRadius={10}
            data-testid="bookcard-skeleton"
            overflow="hidden"
        >
            <CardBody>
                <Skeleton height="400px"></Skeleton>
                <SkeletonText></SkeletonText>
            </CardBody>
        </Card>
    );
};

export default BookCardSkeleton;
