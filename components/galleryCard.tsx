import { Box, Button, chakra, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface GalleryProps {
    reverse: boolean;
    title: string;
    description: string;
    buttonLink: string;
    buttonText: string;
    image: string;
}

const Gallery: React.FC<GalleryProps> = (props) => {
    const { reverse, title, description, buttonLink, buttonText, image } = props;

    return (
        <Box>
            <SimpleGrid
                alignItems="center"
                columns={{ base: 1, md: 2 }}
                flexDirection={reverse ? 'column-reverse' : 'column'}
                spacingY={{ base: 0, md: 32 }}
                spacingX={{ base: 10, md: 24 }}
            >
                <Box order={reverse ? { base: null, md: 2 } : null}>
                    <chakra.h2
                        mb={4}
                        fontSize={{ base: '2xl', md: '4xl' }}
                        fontWeight="extrabold"
                        letterSpacing="tight"
                        textAlign={{ base: 'center', md: 'left' }}
                        color={useColorModeValue('gray.900', 'gray.400')}
                        lineHeight={{ md: 'shorter' }}
                    >
                        {title}
                    </chakra.h2>
                    <chakra.p
                        mb={5}
                        textAlign={{ base: 'center', sm: 'left' }}
                        color={useColorModeValue('gray.600', 'gray.400')}
                        fontSize={{ md: 'lg' }}
                    >
                        {description}
                    </chakra.p>
                    <Button
                        w={{ base: 'full', sm: 'auto' }}
                        size="lg"
                        colorScheme="purple"
                        as="a"
                        href={buttonLink}
                    >
                        {buttonText}
                    </Button>
                </Box>
                <Box py={{ base: 20, md: 10 }}>
                    <Image width={300} height={300} alt={title} src={image} />
                </Box>
            </SimpleGrid>
        </Box>
    );
};

// <Box w="full" h="full" py={48} bg={useColorModeValue('gray.200', 'gray.700')}>
// </Box>

export default Gallery;
