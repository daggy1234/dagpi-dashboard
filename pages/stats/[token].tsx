import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
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
    VStack
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

import AccessDenied from '../../components/access-denied';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import SEO from '../../components/seo';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Stats({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    if (data.got == false) {
        return <ErrorPage statusCode={404} />;
    }
    const [session, loading] = useSession();

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

    if (data.present == false) {
        return (
            <Layout>
                <Flex padding="5%" m="5%" justifyContent="center">
                    <VStack spacing={3}>
                        <Heading>No Api requests have been made :(</Heading>
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
    // const series = data.pie.series;
    return (
        <>
            <SEO title="Stats" description="Dagpi stat dashbaord. Ciew detailed user statistics." />
            <Layout>
                <Box m="5%">
                    <Flex direction="row">
                        <Heading size="2xl">Stats</Heading>
                        <Spacer />
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
                        <Box as="div" mr="5%" color={useColorModeValue('black', 'white')}>
                            <Chart
                                type="donut"
                                height="200px"
                                width={useBreakpointValue({ base: '100%', md: '25%' })}
                                series={data.data.pie.series}
                                options={{
                                    labels: data.data.pie.labels,
                                    title: {
                                        text: 'Api useage split',
                                        align: 'center'
                                    },
                                    tooltip: {
                                        theme: useColorModeValue('light', 'dark')
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            as="div"
                            border="2px"
                            borderRadius="12px"
                            borderColor="rgb(226, 232, 240)">
                            <StatGroup p={5}>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total Api Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.raw.total}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last 24 hours
                                    </StatHelpText>
                                </Stat>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total {data.data.pie.labels[0]} Api Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.pie.series[0]}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last 24 hours
                                    </StatHelpText>
                                </Stat>
                                <Stat size="lg" p={5}>
                                    <StatLabel fontSize="lg" fontWeight="bold">
                                        Total {data.data.pie.labels[1]} Api Calls
                                    </StatLabel>
                                    <StatNumber>{data.data.pie.series[1]}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        in the last 24 hours
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
                                        text: 'Api Routes over 24 hours',
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
                                        text: 'Time Series Visual (10 minute intervals)',
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
                                        type: 'solid',
                                        fillOpacity: 0.7
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
                                        text: 'Time Series Preferred Routes (10 minute intervals)',
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
                                {data.data.ua.map((item, key) => (
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
    const token = context.params.token;
    if (token.length != 64) {
        return {
            notFound: true
        };
    }
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/routes/base-stat', {
        method: 'POST',
        body: JSON.stringify({ token: token })
    });
    const data = await res.json();
    if (!data) {
        return {
            notFound: true
        };
    }
    return { props: { data } };
};
