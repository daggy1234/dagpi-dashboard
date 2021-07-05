import {
    Box,
    Button,
    chakra,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Heading,
    Icon,
    Image,
    Input,
    Radio,
    RadioGroup,
    Select,
    SimpleGrid,
    Spacer,
    Spinner,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { atomOneDark, docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import * as Yup from 'yup';

import Layout from '../components/layout';
import SEO from '../components/seo';

interface Request {
    url: string;
    feature: string;
}

interface DataRequest {
    feature: string;
}

const validation = Yup.object().shape({
    url: Yup.string()
        .required('Required')
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/,
            'Inavlid URL. Please provide a proper URL'
        ),
    feature: Yup.string().required('Chose a feature')
});

const validationData = Yup.object().shape({
    feature: Yup.string().required('Chose a feature')
});

const ImagePlayground = ({ token }) => {
    const [url, setUrl] = useState('https://via.placeholder.com/500');
    const [manipulating, Setmanipulating] = useState(false);
    const [error, SetError] = useState(false);
    const features = [
        'america',
        'communism',
        'gay',
        'ascii',
        'pixel',
        'colors',
        'wanted',
        'wasted',
        'sobel',
        'triangle',
        'hog',
        'rgb',
        'stringify',
        'mosiac',
        'jail',
        'deepfry',
        'neon',
        'petpet',
        'sketch',
        'dissolve',
        'comic',
        'bonk',
        'spin',
        'bomb',
    ];
    return (
        <Flex w="100%" direction={{ base: 'column', md: 'row' }} px={4}>
            <Flex direction="column" w={{ base: '100%', md: '70%', xl: '40%' }}>
                <chakra.h1
                    mb={3}
                    mt={3}
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="bold"
                    lineHeight="shorter"
                    color={useColorModeValue('gray.900', 'white')}>
                    Image Playground
                </chakra.h1>
                <chakra.p mb={5} color="gray.500" fontSize={{ md: 'lg' }}>
                    Everyone learns best when they get to experience and use Dagpi first hand. We
                    wanted to let you experiment freely with Dagpi, and realise the positive impact
                    it may have.
                </chakra.p>
                <Box p={{ base: 2, md: 10 }}>
                    <Box>
                        <Box mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <Formik
                                initialValues={{
                                    url: '',
                                    feature: ''
                                }}
                                validationSchema={validation}
                                onSubmit={async (values: Request, actions) => {
                                    Setmanipulating(true);
                                    const r = await fetch('/api/routes/dagpi-manip', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            url: values.url,
                                            method: values.feature,
                                            token: token
                                        })
                                    });
                                    const js = await r.json();
                                    console.log(js);
                                    if (js.image) {
                                        setUrl(js.image);
                                    } else {
                                        setUrl(JSON.stringify(js, null, 3));
                                        SetError(true);
                                    }

                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                    Setmanipulating(false);
                                }}>
                                {(props) => (
                                    <Form>
                                        <Stack
                                            px={4}
                                            py={5}
                                            bg={useColorModeValue('gray.100', 'gray.700')}
                                            spacing={6}
                                            p={{ sm: 6 }}>
                                            <Heading size="md">Specify the Image</Heading>
                                            <Field name="feature">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.feature &&
                                                            form.touched.feature
                                                        }
                                                        name="feature"
                                                        isRequired>
                                                        <FormLabel>Chose API Feature</FormLabel>
                                                        <FormErrorMessage>
                                                            {form.errors.feature}
                                                        </FormErrorMessage>
                                                        <Select
                                                            placeholder="Select Feature"
                                                            id="feature"
                                                            {...field}>
                                                            {features.map((value, index) => {
                                                                return (
                                                                    <option
                                                                        key={index}
                                                                        value={value}>
                                                                        {value}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <SimpleGrid columns={3} spacing={6}>
                                                <Field name="url">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            isInvalid={
                                                                form.errors.url && form.touched.url
                                                            }
                                                            as={GridItem}
                                                            colSpan={[3, 2]}>
                                                            <FormLabel
                                                                fontSize="sm"
                                                                fontWeight="md"
                                                                htmlFor="url"
                                                                color={useColorModeValue(
                                                                    'gray.700',
                                                                    'gray.50'
                                                                )}>
                                                                Image
                                                            </FormLabel>
                                                            <FormErrorMessage>
                                                                {form.errors.url}
                                                            </FormErrorMessage>
                                                            <Input
                                                                {...field}
                                                                id="url"
                                                                w="100%"
                                                                placeholder="https://example.com/memes.png"
                                                                focusBorderColor="brand.400"
                                                                rounded="md"
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </SimpleGrid>
                                            <Flex
                                                mt={1}
                                                justify="center"
                                                px={6}
                                                pt={5}
                                                pb={6}
                                                borderWidth={2}
                                                borderColor={useColorModeValue(
                                                    'gray.300',
                                                    'gray.500'
                                                )}
                                                borderStyle="dashed"
                                                rounded="md">
                                                <Stack spacing={1} textAlign="center">
                                                    <Icon
                                                        mx="auto"
                                                        boxSize={12}
                                                        color={useColorModeValue(
                                                            'gray.400',
                                                            'gray.500'
                                                        )}
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true">
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </Icon>
                                                    <Flex
                                                        fontSize="sm"
                                                        color={useColorModeValue(
                                                            'gray.600',
                                                            'gray.400'
                                                        )}
                                                        alignItems="baseline">
                                                        <chakra.label
                                                            htmlFor="file-upload"
                                                            cursor="pointer"
                                                            rounded="md"
                                                            fontSize="md"
                                                            color={useColorModeValue(
                                                                'brand.600',
                                                                'brand.200'
                                                            )}
                                                            pos="relative"
                                                            _hover={{
                                                                color: useColorModeValue(
                                                                    'brand.400',
                                                                    'brand.300'
                                                                )
                                                            }}>
                                                            <span>Paste the Image Url</span>
                                                        </chakra.label>
                                                    </Flex>
                                                    <Text
                                                        fontSize="xs"
                                                        color={useColorModeValue(
                                                            'gray.500',
                                                            'gray.50'
                                                        )}>
                                                        PNG, JPG, GIF up to 10MB
                                                    </Text>
                                                </Stack>
                                            </Flex>
                                            <Button
                                                colorScheme="blue"
                                                isLoading={props.isSubmitting}
                                                type="submit">
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                    <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
                        <Box py={5}>
                            <Box
                                borderTop="solid 1px"
                                borderTopColor={useColorModeValue(
                                    'gray.200',
                                    'whiteAlpha.200'
                                )}></Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Spacer />
            <Flex px={4} py={32} alignSelf="flex-end">
                <Flex alignContent="center" mx="auto" justifyContent="center">
                    {manipulating ? (
                        <Spinner
                            thickness="10px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    ) : error ? (
                        <SyntaxHighlighter
                            padding="10"
                            language="json"
                            style={useColorModeValue(docco, atomOneDark)}>
                            {url}
                        </SyntaxHighlighter>
                    ) : (
                        <Image height="500" width="500" src={url} />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

const DataPlayground = ({ token }) => {
    const [manipulating, Setmanipulating] = useState(false);
    const [json, SetJson] = useState(`{"response": "make a request to get started"}`);
    const features = [
        'roast',
        'joke',
        'waifu',
        'wtp',
        'pickupline',
        'logo',
        'flag',
        'fact',
        'yomama',
        'headline',
        'typeracer',
        'captcha'
    ];
    return (
        <Flex
            w="100%"
            direction={{ base: 'column', md: 'row' }}
            px={4}
            paddingTop={10}
            paddingEnd={32}>
            <Flex direction="column" w={{ base: '100%', md: '50%', xl: '40%' }}>
                <chakra.p
                    mb={2}
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    color="gray.400"
                    textTransform="uppercase">
                    Playground
                </chakra.p>
                <chakra.h1
                    mb={3}
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="bold"
                    lineHeight="shorter"
                    color={useColorModeValue('gray.900', 'white')}>
                    Data Playground
                </chakra.h1>
                <chakra.p mb={5} color="gray.500" fontSize={{ md: 'lg' }}>
                    Everyone learns best when they get to experience and use Dagpi first hand. We
                    wanted to let you experiment freely with Dagpi, and realise the positive impact
                    it may have.
                </chakra.p>
                <Box p={{ base: 0, md: 10 }}>
                    <Box>
                        <Box mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <Formik
                                initialValues={{
                                    feature: ''
                                }}
                                validationSchema={validationData}
                                onSubmit={async (values: DataRequest, actions) => {
                                    console.log('WTF');
                                    Setmanipulating(true);
                                    const r = await fetch('/api/routes/dagpi-manip-data', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            method: values.feature,
                                            token: token
                                        })
                                    });
                                    const js = await r.json();
                                    console.log(js);
                                    if (js.json) {
                                        SetJson(JSON.stringify(js.json, null, 3));
                                    } else {
                                        SetJson(JSON.stringify(js, null, 3));
                                    }

                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                    Setmanipulating(false);
                                }}>
                                {(props) => (
                                    <Form>
                                        <Stack
                                            px={4}
                                            py={5}
                                            bg={useColorModeValue('gray.100', 'gray.700')}
                                            spacing={6}
                                            p={{ sm: 6 }}>
                                            <Field name="feature">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.feature &&
                                                            form.touched.feature
                                                        }
                                                        name="feature"
                                                        isRequired>
                                                        <FormLabel>Chose Api Feature</FormLabel>
                                                        <FormErrorMessage>
                                                            {form.errors.feature}
                                                        </FormErrorMessage>
                                                        <Select
                                                            placeholder="Select Feature"
                                                            id="feature"
                                                            {...field}>
                                                            {features.map((value, index) => {
                                                                return (
                                                                    <option
                                                                        key={index}
                                                                        value={value}>
                                                                        {value}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button
                                                colorScheme="blue"
                                                isLoading={props.isSubmitting}
                                                type="submit">
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                    <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
                        <Box py={5}>
                            <Box
                                borderTop="solid 1px"
                                borderTopColor={useColorModeValue(
                                    'gray.200',
                                    'whiteAlpha.200'
                                )}></Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>

            <Flex overflowX="scroll" px={4} py={32} alignSelf={{ base: 'left', md: 'flex-end' }}>
                <Flex alignContent="center" mx="auto" justifyContent="center">
                    {manipulating ? (
                        <Box alignContent="center" alignItems="center">
                            <Spinner
                                thickness="10px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        </Box>
                    ) : (
                        <Box>
                            <SyntaxHighlighter
                                wrapLongLines
                                language="json"
                                style={useColorModeValue(docco, atomOneDark)}>
                                {json}
                            </SyntaxHighlighter>
                        </Box>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default function Playground() {
    const [value, setValue] = useState('1');
    const [token, setToken] = useState('');
    const handleChange = (event) => setToken(event.target.value);
    return (
        <>
            <SEO
                url="https://dagpi.xyz/playground"
                title="Playground"
                description="Dagpi Playground. Test API endpoints and manipulate images with our web playground, to try Dagpi yourself."
            />
            <Layout>
                <Flex m={{ base: '1', md: '5%' }} direction="column">
                    <Flex mb={1} direction="column">
                        <Flex mb={4}>
                            <Heading>Dagpi Playground</Heading>
                            <Spacer />
                            <RadioGroup
                                size="lg"
                                onChange={(v) => {
                                    setValue(v.toString());
                                }}
                                value={value}>
                                <Stack direction="row">
                                    <Radio value="1">Image</Radio>
                                    <Radio value="2">Data</Radio>
                                </Stack>
                            </RadioGroup>
                        </Flex>

                        <Divider />
                        <Flex
                            w={{ base: '100%', md: '60%' }}
                            mb={5}
                            mt={5}
                            direction={{ base: 'column', md: 'row' }}>
                            <FormLabel>
                                Enter your token if you have one! Othewrise you will have a heavily
                                ratelimited playground.
                            </FormLabel>
                            <Input
                                value={token}
                                onChange={handleChange}
                                placeholder="enter your own token"
                            />
                        </Flex>
                    </Flex>
                    <Divider />

                    {value === '1' ? (
                        <ImagePlayground token={token} />
                    ) : (
                        <DataPlayground token={token} />
                    )}
                </Flex>
            </Layout>
        </>
    );
}
