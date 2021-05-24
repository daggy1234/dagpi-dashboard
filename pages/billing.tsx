// import {
//     Box,
//     Button,
//     chakra,
//     Divider,
//     Flex,
//     Heading,
//     Icon,
//     SimpleGrid,
//     Spacer,
//     Stack,
//     Stat as ChakraStat,   StatLabel as ChakraStatLabel, StatLabelProps,
//     StatNumber as ChakraStatNumber,
//   StatNumberProps,
// StatProps,
//     Text,
//     useBreakpointValue,
//     useColorModeValue,
// } from '@chakra-ui/react';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { route } from 'next/dist/next-server/server/router';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/client';
// import { useEffect, useState } from 'react';
// import React from 'react';
// import {BsArrowLeftShort} from 'react-icons/bs'
// import { FaCcStripe,FaPaypal } from 'react-icons/fa'
// import {RiBillFill} from 'react-icons/ri';

// import AccessDenied from '../components/access-denied';
// import Layout from '../components/layout';
// import Loading from '../components/loading';
// import SEO from '../components/seo';

// interface Donation {
//     id: number;
//     client_id: string;
//     charge_id: string;
//     amount: number;
//     provider: string;
//     created_at: string;
//     receipt?: string;
//   }

// interface TableProps {
//     items: Donation[];
// }


// export const StatLabel = (props: StatLabelProps) => (
//   <ChakraStatLabel
//     fontWeight="medium"
//     isTruncated
//     color={useColorModeValue('gray.500', 'gray.400')}
//     {...props}
//   />
// )

// export const StatNumber = (props: StatNumberProps) => (
//     <ChakraStatNumber
//       fontSize="3xl"
//       fontWeight="medium"
//       color={useColorModeValue('gray.900', 'white')}
//       {...props}
//     />
//   )

//   export const Stat = (props: StatProps) => (
//     <ChakraStat
//       px={{ base: 4, sm: 6 }}
//       py="5"
//       bg={useColorModeValue('gray.100', 'gray.700')}
//       rounded="lg"
//       {...props}
//     />
//   )

// const Table: React.FC<TableProps> = (props) => {
//     const data = props.items;
//     const router = useRouter();
//     return (
//         <Flex w="full" p={{ base: 5, md: 50 }} alignItems="center" justifyContent="center">
//             <Stack
//                 direction={{ base: 'column' }}
//                 w="full"
//                 spacing={{ base: 6, md: 0 }}
//                 borderStyle="solid"
//                 borderWidth={data.length == 0 ? null : { base: null, md: '1px' }}
//                 borderColor={useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.16)')}
//                 bg={{ sm: useColorModeValue('white', 'gray.800') }}>
//                 {data.length == 0 ? (
//                     <Box textAlign="center">
//                         <Heading>You Have made no donations</Heading>
//                         <Text>
//                             Click on the button below to donate
//                         </Text>
//                         <Button colorScheme="blue" onClick={() => router.push("/donate")}>
//                             Donate
//                         </Button>
//                     </Box>
//                 ) : (
//                     data.map((donation, pid) => {
//                         return (
//                             <Flex
//                                 key={pid}
//                                 direction={{ base: 'row', sm: 'column' }}
//                                 bg={useColorModeValue('white', 'gray.800')}>
//                                 {useBreakpointValue({ base: true, sm: pid === 0 }) && (
//                                     <SimpleGrid
//                                         spacingY={3}
//                                         borderStyle="solid"
//                                         borderBottom="1px"
//                                         borderRight={{ base: '1px', md: null }}
//                                         borderLeft={{ base: '1px', md: null }}
//                                         borderTop={{ base: '1px', md: null }}
//                                         borderColor={useColorModeValue('gray.200', 'gray.700')}
//                                         columns={{ base: 1, sm: 5 }}
//                                         w={{ base: 100, sm: 'full' }}
//                                         color={useColorModeValue('gray.500', 'gray.400')}
//                                         bg={useColorModeValue('gray.50', 'inherit')}
//                                         py={{ base: 1, sm: 4 }}
//                                         px={{ base: 2, sm: 10 }}>
//                                         <Text
//                                             fontWeight="bold"
//                                             textTransform="uppercase"
//                                             fontSize="sm">
//                                             Id
//                                         </Text> 
//                                         <Text
//                                             fontWeight="bold"
//                                             textTransform="uppercase"
//                                             fontSize="sm">
//                                             Donated
//                                         </Text>
//                                         <Text
//                                             fontWeight="bold"
//                                             textTransform="uppercase"
//                                             fontSize="sm">
//                                             Amount
//                                         </Text>
//                                         <Text
//                                             fontWeight="bold"
//                                             textTransform="uppercase"
//                                             fontSize="sm">
//                                             Provider
//                                         </Text>
//                                         <Text
//                                             fontWeight="bold"
//                                             textTransform="uppercase"
//                                             fontSize="sm">
//                                             Reciept
//                                         </Text>
//                                     </SimpleGrid>
//                                 )}
//                                 <SimpleGrid
//                                     spacingY={{ base: 3, md: 0 }}
//                                     columns={{ base: 1, sm: 5 }}
//                                     borderStyle="solid"
//                                     borderBottom="1px"
//                                     borderRight={{ base: '1px', md: null }}
//                                     borderTop={{ base: '1px', md: null }}
//                                     color={useColorModeValue(
//                                         'gray.800',
//                                         'rgba(255, 255, 255, 0.92)'
//                                     )}
//                                     borderColor={useColorModeValue('gray.200', 'gray.700')}
//                                     py={4}
//                                     px={10}>
//                                     <span>
//                                         <Text>{donation.id}</Text>
//                                     </span>

//                                     <span>
//                                         <Text>
//                                             {formatDistanceToNow(Date.parse(donation.created_at))} ago
//                                         </Text>
//                                     </span>
//                                     <span>
//                                         <Text>
//                                             ${donation.amount}.00
//                                         </Text>
//                                     </span>
//                                     <span>
//                                         {
//                                             donation.provider != 'stripe' ? (
//                                                 <Button  fontWeight="bold" leftIcon={<Icon as={FaPaypal} color="#253b80" />} bg="#ffc439"  _active={{}} _focus={{}} _hover={{}}>
//                                                     <chakra.span color="#222d65">Pay</chakra.span>
//                                                     <chakra.span color="#169bd7">Pal</chakra.span>
//                                                 </Button>
//                                             ) : (
//                                                 <Button fontWeight="bold" color="white" leftIcon={<Icon as={FaCcStripe} />}  bgGradient="linear(to-r, #a960ee, #90e0ff)" _active={{}} _focus={{}} _hover={{}}>
//                                                     Stripe
//                                                 </Button>
//                                             )
//                                         }
//                                     </span>
//                                     <span>
//                                         <Button colorScheme="green" rightIcon={<Icon as={RiBillFill} />} onClick={() => router.push(donation.provider == 'stripe' ? donation.receipt : `https://www.paypal.com/myaccount/transactions/print-details/${donation.charge_id}`)} >
//                                             Reciept
//                                         </Button>
//                                     </span>
//                                 </SimpleGrid>
//                             </Flex>
//                         );
//                     })
//                 )}
//             </Stack>
//         </Flex>
//     );
// };


// export default function Page() {
//     const big = useBreakpointValue({ base: false, md: true });
//     const [session, loading] = useSession();
//     const router = useRouter();
//     const [data, SetData] = useState(null);


//     useEffect(() => {
//         const json = async () => {
//             const tokens = await fetch('/api/payments/get-donations');
//             const tok_obj = await tokens.json();
//             SetData(tok_obj);
//         };
//         json();
//     }, [session]);


//     if (typeof window !== 'undefined' && loading) return null;

//     if (!session) {
//         return (
//             <Layout>
//                 <AccessDenied />
//             </Layout>
//         );
//     }

//     if (!data) {
//         return (
//             <Layout>
//                 <Flex padding="5%" justifyContent="center">
//                     <Loading />
//                 </Flex>
//             </Layout>
//         );
//     }

//     return (
//         <>
//             <SEO
//                 title="Tokens"
//                 url="https://dagpi.xyz/tokens"
//                 description="Billing Information"
//             />
//             <Layout>
//                 <Box padding="5%">
//                     <Flex>
//                         <Box width={{ base: '50%', md: '75%' }}>
//                             <Heading>Billing</Heading>
//                         </Box>
//                         {big && <Spacer />}
//                         <Button
//                             onClick={() => router.push("/dashboard")}
//                             colorScheme="purple"
//                             leftIcon={<Icon as={BsArrowLeftShort} />}>
//                             Dashboard
//                         </Button>
//                     </Flex>
//                     <Divider mt={10} mb={7} />
//                     <Heading ml={6}>Premium</Heading>
//                     <Box py={5} px={{ base: '6', md: '8' }} mx="auto">
//                         Coming Soon!
//                     </Box>
//                     <Box px={{base: 1, md: 8}}>
//                     <Divider mt={10} mb={7} />
//                     <Heading>Donations</Heading>
//                     {data.items.length != 0 &&  (<Box as="section" p="10">
//                         <Box maxW="7xl" mx="auto" px={{ base: '1', md: '12' }}>
//                             <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
//                                 <Stat>
//                                     <StatLabel>Total Donations</StatLabel>
//                                     <StatNumber>{data.items.length}</StatNumber>
//                                 </Stat>
//                                 <Stat>
//                                     <StatLabel>Total Amount</StatLabel>
//                                     <StatNumber>${data.items.reduce((sum, donation) => {
//                                         return sum  +donation.amount
//                                     }, 0)}.00</StatNumber>
//                                 </Stat>
//                                 <Stat>
//                                     <StatLabel>Most Recent Donation</StatLabel>
//                                     <StatNumber>{new Date(data.items[0].created_at).toDateString()}</StatNumber>
//                                 </Stat>
//                             </SimpleGrid>
//                         </Box>
//                     </Box>)
//                     }
//                     <Table
//                         items={data.items}
//                     />
//                     </Box>
//                 </Box>
//             </Layout>
//         </>
//     );
// }

import ComingSoon from '../components/coming-soon';
import Layout from '../components/layout';

export default function Page() {
    return(
        <Layout>
            <ComingSoon />
        </Layout>
        )
}