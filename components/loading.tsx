import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
    return (
        <Flex alignContent="center" alignItems="center" padding="5%">
            <Spinner color="purple.200" thickness="4px" size="xl" />
        </Flex>
    );
}
