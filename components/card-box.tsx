import { Box, BoxProps, Flex, FlexProps, Heading, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

interface CardHeaderProps {
    title: string;
}

const CardHeader = (props: CardHeaderProps) => {
    const { title } = props;
    return (
        <Flex align="center" justify="space-between" px="6" py="4" borderBottomWidth="1px">
            <Heading as="h2" fontSize="lg">
                {title}
            </Heading>
        </Flex>
    );
};

const CardContent = (props: BoxProps) => <Box {...props} />;

const Card = (props: BoxProps) => (
    <Box
        bg={useColorModeValue('white', 'gray.700')}
        rounded={{ md: 'lg' }}
        shadow="base"
        overflow="hidden"
        {...props}
    />
);

interface PropertyProps extends FlexProps {
    label: string;
    value: string;
}

const Property = (props: PropertyProps) => {
    const { label, value, ...flexProps } = props;
    return (
        <Flex
            as="dl"
            direction={{ base: 'column', sm: 'row' }}
            px="6"
            py="4"
            _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
            {...flexProps}>
            <Box as="dt" minWidth="180px">
                {label}
            </Box>
            <Box as="dd" flex="1" fontWeight="semibold">
                {value}
            </Box>
        </Flex>
    );
};

interface FancyCardProps {
    title: string;
    properties: Array<string[]>;
}

const FancyCard = (props: FancyCardProps) => {
    const { title, properties } = props;
    return (
        <Box my={3} px={{ md: '8' }}>
            <Card maxW="3xl" mx="auto">
                <CardHeader title={title} />
                <CardContent>
                    {properties.map((elm, ind) => (
                        <Property key={ind} label={elm[0]} value={elm[1]} />
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

export default FancyCard;
