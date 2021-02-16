import {
    Badge,
    Box,
    Container,
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { AutoPlay, Fade } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';

const Card = (props) => {
    return (
        <Container>
            <Flex
                maxW="lg"
                direction="column"
                bg={useColorModeValue('gray.100', 'gray.600')}
                pl="20"
                pr="20"
                pb="20"
                borderRadius="lg"
                textAlign="justify"
                overflow="hidden">
                <Box display="flex" flexDirection="column" mt="20px" mr="20px">
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
    // @ts-ignore
    const plugins = [new Fade(), new AutoPlay(2000, 'NEXT')];
    const titles: Array<Obj> = [
        {
            title: 'Amazing Datasets',
            api: 'data',
            body:
                "Fun jokes, roasts and pickup lines are provided through Dagpi's expansive datasets",
            url: '/Example/data.png'
        },
        {
            title: 'Innovative Games',
            api: 'data',
            body:
                'Stray away from common games, and add titles such as "Who\'s that Pokemon?" to your arsenal',
            url: '/Example/Wtp.png'
        },
        {
            title: 'GIF Manipulation',
            api: 'image',
            body:
                "Soar above the competition by taking advantage of Dagpi's tools on static images AND animated GIFs",
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
            body:
                "Dagpi's flagship meme generator accomodates quality content creation in an ever-increasing array of styles",
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
