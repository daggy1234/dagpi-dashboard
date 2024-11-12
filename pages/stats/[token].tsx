/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stat,
    StatArrow,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useColorModeValue,
    useToast,
    VStack
} from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';
import { BiArrowBack, BiTimeFive } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

import AccessDenied from '../../components/access-denied';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import SEO from '../../components/seo';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Stats({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
    const gw = useBreakpointValue({ base: '100%', md: '25%' });
    const textcolor = useColorModeValue('black', 'white');
    const toast = useToast();
    if (data.got == false) {
        return <ErrorPage statusCode={404} />;
    }
    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    {
        loading && (
            <Layout>
                <Flex padding="5%" justifyContent="center">
                    <Loading />
                </Flex>
            </Layout>
        );
    }

    console.log(data);
    const Redirect = (tp: number) => {
        toast({
            title: 'Loading.......',
            description: 'Fetching new Stats and re-rendering data',
            status: 'success',
            duration: 3000,
            isClosable: false
        });
        router.push({ pathname: `/stats/${data.token}`, query: { token: data.token, tp } });
    };

    if (!data.present && !data.token) {
        return (
            <Layout>
                <Flex padding="5%" m="5%" justifyContent="center">
                    <VStack spacing={3}>
                        <Heading>Invalid API token</Heading>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" colorScheme="pink">
                                Dashboard
                            </Button>
                        </Link>
                    </VStack>
                </Flex>
            </Layout>
        );
    }

    if (!data.present) {
        return (
            <Layout>
                <Flex padding="5%" m="5%" justifyContent="center">
                    <VStack spacing={3}>
                        <Heading>No API requests have been made :(</Heading>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" colorScheme="pink">
                                Dashboard
                            </Button>
                        </Link>
                        <Menu>
                            <MenuButton
                                colorScheme="pink"
                                leftIcon={<BiTimeFive />}
                                rightIcon={<FiChevronDown />}
                                mr={2}
                                size="lg"
                                as={Button}>
                                Time Period
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => Redirect(1)}>24 hours</MenuItem>
                                <MenuItem onClick={() => Redirect(2)}>1 week</MenuItem>
                                <MenuItem onClick={() => Redirect(3)}>a month</MenuItem>
                            </MenuList>
                        </Menu>
                    </VStack>
                </Flex>
            </Layout>
        );
    }
    // const series = data.pie.series;
    let time_str: string;
    let interval: string;

    switch (parseInt(data.tp)) {
        case 1:
            time_str = '24 hours';
            interval = '10 minutes';
            break;
        case 2:
            time_str = '1 week';
            interval = '1 hour';
            break;
        case 3:
            time_str = '1 month';
            interval = '6 hours';
            break;
        default:
            time_str = 'error';
            interval = 'error';
            break;
    }

    return (
        <>
            <SEO
                url="https://dagpi.xyz/dashboard"
                title="Stats"
                description="Dagpi stat dashboard. View detailed user statistics."
            />
            <Layout>
                <Box m="5%">
                    <Flex direction="row">
                        <Heading size="2xl">Stats for the last {time_str}</Heading>
                        <Spacer />
                        <Menu>
                            <MenuButton
                                colorScheme="pink"
                                leftIcon={<BiTimeFive />}
                                rightIcon={<FiChevronDown />}
                                mr={2}
                                size="lg"
                                as={Button}>
                                Time Period
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => Redirect(1)}>24 hours</MenuItem>
                                <MenuItem onClick={() => Redirect(2)}>1 week</MenuItem>
                                <MenuItem onClick={() => Redirect(3)}>a month</MenuItem>
                            </MenuList>
                        </Menu>
                        <Link href="/dashboard">
                            <Button
                                alignSelf="flex-end"
                                colorScheme="purple"
                                size="lg"
                                leftIcon={<BiArrowBack />}>
                                Dashboard
                            </Button>
                        </Link>
                    </Flex>
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            boxSizing: 'border-box',
                            padding: '2%'
                        }}>
                        <Box as="div" mr="5%" color={textcolor}>
                            <Chart
                                type="donut"
                                height="200px"
                                width={gw}
                                series={data.data.pie.series}
                                options={{
                                    labels: data.data.pie.labels,
                                    title: {
                                        text: 'Api useage split',
                                        align: 'center'
                                    },
                                    tooltip: {
                                        theme: 'dark'
                                    }
                                }}
                            />
                        </Box>
                        <Spacer />
                        <Box
                            as="div"
                            border="2px"
                            borderRadius="12px"
                            borderColor="rgb(226, 232, 240)">
                            <StatGroup p={5}>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total API Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.raw.total}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last {time_str}
                                    </StatHelpText>
                                </Stat>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total {data.data.pie.labels[0]} API Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.pie.series[0]}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last {time_str}
                                    </StatHelpText>
                                </Stat>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total {data.data.pie.labels[1]} API Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.pie.series[1]}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last {time_str}
                                    </StatHelpText>
                                </Stat>
                            </StatGroup>
                        </Box>
                    </div>
                    <Divider />
                    <Box p="2%">
                        <Box as="div">
                            <Chart
                                type="bar"
                                height="300px"
                                width="100%"
                                series={[{ data: data.data.routes.series }]}
                                options={{
                                    xaxis: {
                                        categories: data.data.routes.labels
                                    },
                                    title: {
                                        text: `API Routes over ${time_str}`,
                                        align: 'left'
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    legend: {
                                        show: false
                                    },
                                    plotOptions: {
                                        bar: {
                                            borderRadius: 6,
                                            columnWidth: '45%',
                                            distributed: true
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Divider />
                    <Box p="2%">
                        <Box as="div">
                            <Chart
                                series={[{ data: data.data.tree }]}
                                width="100%"
                                height="300px"
                                // @ts-ignore
                                type="treemap"
                                options={{
                                    legend: {
                                        show: false
                                    },
                                    chart: {
                                        type: 'treemap'
                                    },
                                    title: {
                                        text: 'Treemap of routes',
                                        align: 'left'
                                    },
                                    theme: {
                                        palette: 'palette8' // upto palette10
                                    },
                                    plotOptions: {
                                        treemap: {
                                            distributed: true
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Divider />
                    <Box p="2%">
                        <Box as="div">
                            <Chart
                                type="area"
                                series={[{ data: data.data.times, name: 'Useage' }]}
                                options={{
                                    chart: {
                                        type: 'area',
                                        stacked: false
                                    },
                                    title: {
                                        text: `Time Series Visual (Interval: ${interval})`,
                                        align: 'left'
                                    },
                                    xaxis: {
                                        type: 'datetime'
                                    },
                                    stroke: {
                                        curve: 'smooth',
                                        width: 3
                                    },
                                    markers: {
                                        size: 0
                                    },
                                    tooltip: {
                                        x: {
                                            format: 'HH:mm d/M/yyyy'
                                        },
                                        shared: false
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    fill: {
                                        type: 'solid'
                                    }
                                }}
                                height="300px"
                                width="100%"
                            />
                        </Box>
                    </Box>
                    <Divider />
                    <Box p="2%">
                        <Box as="div">
                            <Chart
                                type="bubble"
                                series={data.data.bubbles}
                                width="100%"
                                height="400px"
                                options={{
                                    title: {
                                        text: `Time Series Preferred Routes (Interval: ${interval})`,
                                        align: 'left'
                                    },
                                    xaxis: {
                                        type: 'datetime'
                                    },
                                    chart: {
                                        height: 350,
                                        type: 'bubble'
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    tooltip: {
                                        x: {
                                            format: 'HH:mm d/M/yyyy'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    <Box p="2%">
                        <Heading size="md">API User Agents</Heading>
                        <Table variant="simple">
                            <TableCaption>API user agents</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>User Agent</Th>
                                    <Th>Count</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.data.ua.map((item: any, key: number) => (
                                    <Tr key={key}>
                                        <Td>{item[0]}</Td>
                                        <Td isNumeric>{item[1]}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context?.params?.token || '';
    const tp = context?.query?.tp;
    if (token.length !== 64) {
        return {
            notFound: true
        };
    }

    if (!tp) {
        return {
            notFound: true
        };
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL || ''}/api/routes/base-stat`, {
        method: 'POST',
        body: JSON.stringify({ token, tp })
    });
    const data = await res.json();
    if (!data) {
        return {
            notFound: true
        };
    }
    return { props: { data } };
};
