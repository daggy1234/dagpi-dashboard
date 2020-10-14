import { Badge, Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/core';
import { AutoPlay, Fade } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';

import Cards from './cards/cards';

const Card = (props) => {
    return (
        <Container>
            <Flex
                _hover={{ transform: 'translateY(-10px)', transition: '.2s' }}
                borderColor="black"
                maxW="lg"
                direction="column"
                bg="gray.100"
                pl="20"
                pr="20"
                pb="20"
                borderWidth="3px"
                borderRadius="lg"
                textAlign="justify"
                overflow="hidden">
                <Box display="flex" flexDirection="column" mr="20px">
                    <Heading size="lg" isTruncated>
                        {props.title}
                        <Box pl="5">
                            <Badge
                                variant="subtle"
                                colorScheme={props.api === 'data' ? 'teal' : 'pink'}>
                                {props.api}
                            </Badge>
                        </Box>
                    </Heading>
                    <Box display="flex" flexDirection="column">
                        <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                            {props.body}
                        </Text>
                    </Box>
                </Box>
                <Image
                    mt="10px"
                    mr="10px"
                    src={props.url}
                    alt={props.title}
                    height="400px"
                    width="400px"
                />
            </Flex>
        </Container>
    );
};

interface Obj {
    title: string;
    api: string;
    body: string;
    url: string;
}

export default function Rounder() {
    const plugins = [new Fade(), new AutoPlay(2000, 'NEXT')];
    const titles: Array<Obj> = [
        {
            title: 'Amazing Datasets',
            api: 'data',
            body: 'High quality jokes,roasts and pickup lines available',
            url: '/Example/data.png'
        },
        {
            title: 'Innovative Games',
            api: 'data',
            body:
                'Break away from overused game, and add fun games like Whose that Pokemon to your arsenal',
            url: '/Example/Wtp.png'
        },
        {
            title: 'GIF Manipulation',
            api: 'image',
            body: 'Manipulate not only Static images but GIF Image Sequences',
            url: '/Example/Edited.gif'
        },
        {
            title: 'Wide array of filters',
            api: 'image',
            body: 'Lots of fun image effects and filters available  to use',
            url: '/Example/filtered.png'
        },
        {
            title: 'Meme Creation Tool',
            api: 'image',
            body:
                'We pride ourselves on our versatile meme generator that allows freestyle meme creation in a variety of styles.',
            url: '/Example/meme.png'
        }
    ];
    return (
        <Box mt="100px" mb="100px">
            <Flicking
                collectStatistics={false}
                className="flicking"
                style={{ paddingBottom: '15%' }}
                circular={true}
                duration={500}
                plugins={plugins}>
                {titles.map((object, index) => (
                    <Card
                        title={object.title}
                        api={object.api}
                        body={object.body}
                        url={object.url}
                        key={index}
                    />
                ))}
            </Flicking>
        </Box>
    );
}
