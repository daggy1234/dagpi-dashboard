import {
    Box,
    BoxProps,
    Flex,
    Heading,
    List,
    ListIcon,
    ListItem,
    Text,
    useColorModeValue as mode,
    VStack
} from '@chakra-ui/react';
import * as React from 'react';
import { HiCheckCircle } from 'react-icons/hi';

export interface CardProps extends BoxProps {
    isPopular?: boolean;
}

export const Card: React.FC<CardProps> = (props) => {
    const { children, isPopular, ...rest } = props;
    return (
        <Box
            position="relative"
            px="8"
            pb="8"
            pt="20"
            bg={mode('gray.50', 'gray.700')}
            shadow="lg"
            border={isPopular ? '2px #B794F4 solid' : ''}
            maxW="md"
            width="100%"
            {...rest}
        >
            {isPopular && (
                <Flex
                    bg={mode('purple.500', 'purple.200')}
                    position="absolute"
                    top="-1.5em"
                    py={2}
                    display="inline-block"
                    left="50%"
                    width="240px"
                    transform="translateX(-50%)"
                    borderRadius="0.5em"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        fontWeight="bold"
                        letterSpacing="wider"
                        color={mode('white', 'gray.800')}
                    >
                        Popular
                    </Text>
                </Flex>
            )}
            {children}
        </Box>
    );
};

export interface PricingCardData {
    features: string[];
    name: string;
    price: string;
}

interface PricingCardProps extends CardProps {
    data: PricingCardData;
    button: React.ReactElement;
    icon: React.ElementType;
}

export const PricingCard = (props: PricingCardProps) => {
    const { data, button, ...rest } = props;
    const { features, price, name } = data;
    const accentColor = mode('purple.600', 'purple.200');

    return (
        <Card rounded={{ sm: 'xl' }} {...rest}>
            <VStack spacing={6}>
                <Heading size="xl" fontWeight="extrabold">
                    {name}
                </Heading>
            </VStack>
            <Flex
                align="flex-end"
                justify="center"
                fontWeight="extrabold"
                color={accentColor}
                my="8"
            >
                <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
                    {price}
                </Heading>
                <Text fontWeight="inherit" fontSize="2xl">
                    / mon
                </Text>
            </Flex>
            <List spacing="4" textAlign="justify" mb="8" maxW="28ch" mx="auto">
                {features.map((feature, index) => (
                    <ListItem fontWeight="medium" key={index}>
                        <ListIcon
                            fontSize="xl"
                            as={HiCheckCircle}
                            marginEnd={2}
                            color={accentColor}
                        />
                        {feature}
                    </ListItem>
                ))}
            </List>
            {button}
        </Card>
    );
};
