/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
import { Badge, Box, Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { AutoPlay, Fade } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import Image from 'next/image';

interface Obj {
    title: string;
    api: string;
    body: string;
    url: string;
}

const Card = (props: Obj) => {
    return (
        <Container>
            <Flex
                maxW="lg"
                direction="column"
                bg={useColorModeValue('gray.200', 'gray.600')}
                pl={{ base: '10', md: '20' }}
                pr={{ base: '10', md: '20' }}
                pb={{ base: '10', md: '20' }}
                borderRadius="lg"
                textAlign="justify"
                overflow="hidden">
                <Box display="flex" flexDirection="column" mt="20px" mr="20px">
                    <Heading size="lg" isTruncated>
                        {props.title}
                        <Box>
                            <Badge
                                fontSize="0.5em"
                                variant="subtle"
                                colorScheme={props.api === 'data' ? 'teal' : 'pink'}>
                                {props.api}
                            </Badge>
                        </Box>
                    </Heading>
                    <Box display="flex" flexDirection="column">
                        <Text mt="1" fontWeight="semibold" lineHeight="tight">
                            {props.body}
                        </Text>
                    </Box>
                </Box>
                <Box mt="10px" mr="10px">
                    <Image src={props.url} alt={props.title} height={400} width={400} />
                </Box>
            </Flex>
        </Container>
    );
};

export default function Rounder() {
    // @ts-ignore
    const plugins = [new Fade(), new AutoPlay(2000, 'NEXT')];
    const titles: Array<Obj> = [
        {
            title: 'Amazing Datasets',
            api: 'data',
            body: "Fun jokes, roasts and pickup lines are provided through Dagpi's expansive datasets",
            url: '/Example/data.png'
        },
        {
            title: 'We <3 Pride',
            api: 'image',
            body: 'Enjoy a wide variety of pride filters for images. Rep your sexuality!',
            url: '/Example/pride.gif'
        },
        {
            title: 'Innovative Games',
            api: 'data',
            body: 'Stray away from common games, and add titles such as "Who\'s that Pokemon?" to your arsenal',
            url: '/Example/Wtp.png'
        },
        {
            title: 'GIF Manipulation',
            api: 'image',
            body: "Soar above the competition by taking advantage of Dagpi's tools on static images AND animated GIFs",
            url: '/Example/Edited.gif'
        },
        {
            title: 'Wide array of filters',
            api: 'image',
            body: "Lots of fun image effects and filters at the user's disposal",
            url: '/Example/filtered.png'
        },
        {
            title: 'Meme Creation Tool',
            api: 'image',
            body: "Dagpi's flagship meme generator accomodates quality content creation in an ever-increasing array of styles",
            url: '/Example/meme.png'
        }
    ];
    return (
        <Box mt="100px" mb="150px">
            <Flicking
                // collectStatistics={false}
                className="flicking"
                viewportTag="div"
                cameraTag="div"
                cameraClass=""
                renderOnSameKey={false}
                align="center"
                style={{ paddingBottom: '15%' }}
                circular
                horizontal
                duration={500}
                // @ts-ignore
                plugins={plugins}>
                {titles.map((object) => (
                    // <Box bg="gray.100" p={10}>Hello</Box>
                    <Box>
                        <Card
                            title={object.title}
                            api={object.api}
                            body={object.body}
                            url={object.url}
                            key={object.title}
                        />
                    </Box>
                ))}
            </Flicking>
        </Box>
    );
}
