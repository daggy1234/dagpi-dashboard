import { Box, BoxProps, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCodeSlash } from 'react-icons/bs';
import { DiGithubBadge } from 'react-icons/di';
import { FaArrowRight, FaDiscord } from 'react-icons/fa';
import { IoIosSpeedometer } from 'react-icons/io';

import DiscordStrip from '../components/discord';
import Layout from '../components/layout';
type StatBoxProps = BoxProps & {
    icon?: React.ElementType;
    title: string;
    description: string;
};

const StatBox = (props: StatBoxProps) => {
    const { icon: StatIcon, title, description, ...rest } = props;
    return (
        <Flex
            direction="column"
            align={{ base: 'center', md: 'flex-start' }}
            pl={{ base: 0, md: '8' }}
            borderLeft="2px solid"
            borderLeftColor="white"
            mr={{ base: '0px', lg: '40px' }}
            {...rest}>
            <Box fontSize={{ base: '4rem', md: '6.75rem' }} lineHeight="1em" mb="20px">
                {title}
            </Box>
            <Stack isInline align="center">
                <StatIcon size="24px" />
                <Text>{description}</Text>
            </Stack>
        </Flex>
    );
};

export default function Page() {
    return (
        <Layout>
            <Head>
                <title>Dagpi</title>
                <meta property="og:title" content="Dagpi" key="title" />
            </Head>
            <Flex
                maxW="760px"
                mx="auto"
                align="center"
                justify="center"
                direction="column"
                textAlign="center">
                <Heading
                    fontSize={{ base: '2.25rem', sm: '3rem', lg: '3.75rem' }}
                    letterSpacing="tight"
                    fontWeight="bold"
                    mb="16px"
                    lineHeight="1.2">
                    A
                    <Box as="span" color="purple.500">
                        {' '}
                        Powerful and Fast{' '}
                    </Box>
                    api that can Do Amazing Things.
                </Heading>

                <Text opacity={0.7} fontSize={{ base: 'lg', lg: 'xl' }} mt="6">
                    Built with a variety of languages to maximise performance, it is fast,reliable
                    and gets the job done
                </Text>

                <Stack
                    mt="10"
                    spacing="4"
                    justify="center"
                    direction={{ base: 'column', lg: 'row' }}>
                    <Button
                        h="4rem"
                        px="40px"
                        fontSize="1.2rem"
                        as="a"
                        size="lg"
                        colorScheme="purple"
                        rightIcon={<FaArrowRight fontSize="0.8em" />}>
                        Get Started
                    </Button>

                    <Button
                        as="a"
                        size="lg"
                        h="4rem"
                        px="40px"
                        fontSize="1.2rem"
                        href="https://github.com/Daggy1234/dagpi"
                        target="__blank"
                        leftIcon={<DiGithubBadge size="1.5em" />}>
                        GitHub
                    </Button>
                </Stack>
            </Flex>

            <br />
            <Box mt="100px" as="section" bg="purple.600">
                <Container py="7.5rem" maxW="1280px" color="white">
                    <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
                        <Heading as="h3" size="2xl" textStyle="heading" mb="5">
                            Some Stats....
                        </Heading>
                        <Text opacity={0.7} fontSize="lg">
                            And we keep growing
                        </Text>
                    </Box>
                    <Stack direction={{ base: 'column', lg: 'row' }}>
                        <StatBox icon={AiOutlineUser} title="30+" description="Active Users" />
                        <StatBox icon={IoIosSpeedometer} title="<50ms" description="Ping" />
                        <StatBox icon={BsCodeSlash} title="5000+" description="Lines of Code" />
                        <StatBox icon={FaDiscord} title="70+" description="Discord members" />
                    </Stack>
                </Container>
            </Box>
            <DiscordStrip mt="100px" />
        </Layout>
    );
}
