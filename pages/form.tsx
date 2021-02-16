/* eslint-disable no-useless-escape */
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Textarea,
    VStack
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import React from 'react';
import * as Yup from 'yup';

import AccessDenied from '../components/access-denied';
import Layout from '../components/layout';
import NextLink from '../components/NextLink';
import App from './_app';

interface App {
    user: string;
    name: string;
    url: string;
    description: string;
    prefix: string;
    terms: boolean;
}

const validation = Yup.object().shape({
    user: Yup.string().length(18, 'Userid must be proper').required('Req'),
    name: Yup.string().required('Required'),
    url: Yup.string()
        .required('Required')
        .matches(
            /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/,
            'Inavlid url. Please provide a proper url'
        ),
    description: Yup.string()
        .required('Required')
        .min(20, 'Please enter a description that is at least 20 characters long'),
    prefix: Yup.string().max(10, 'Prefix Cannot be longer than 10 characters'),
    terms: Yup.boolean().required().oneOf([true], 'Please accept our terms')
});

const Alert = ({ isOpen, cancelRef, onClose, isSuccess }) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {isSuccess ? 'Thank you for your submission' : 'Error with your submission'}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {isSuccess ? 'Thank you for your submission' : 'Error with your submission'}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            onClick={onClose}
                            colorScheme={isSuccess ? 'green' : 'red'}
                            ref={cancelRef}>
                            Ok
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
export default function FormikExample() {
    const [session, loading] = useSession();
    const [isOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(true);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }
    return (
        <>
            <Alert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} isSuccess={success} />
            <Flex padding="5%" direction="column" w="100%" justifyContent="center">
                <VStack spacing={3} alignItems="center">
                    <Heading>Submit this form to add an app!</Heading>
                    <Formik
                        initialValues={{
                            user: session.user.id,
                            name: '',
                            url: '',
                            description: '',
                            prefix: '',
                            terms: false
                        }}
                        validationSchema={validation}
                        onSubmit={(values: App, actions) => {
                            setTimeout(async () => {
                                const post = await fetch('/api/routes/app-creation', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(values, null, 2)
                                });
                                const js = await post.json();
                                if (js.status === 200) {
                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                    setIsOpen(true);
                                    Router.push('/dashboard');
                                } else {
                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                    setSuccess(false);
                                    setIsOpen(true);
                                    Router.push('/');
                                }
                            }, 1000);
                        }}>
                        {(props) => (
                            <Form>
                                <Field name="user">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.user && form.touched.user}>
                                            <FormLabel htmlFor="user">UserId: </FormLabel>
                                            <Input
                                                {...field}
                                                id="user"
                                                placeholder="user"
                                                size="lg"
                                                isReadOnly
                                                value={session.user.id}
                                                errorBorderColor="crimson"
                                                focusBorderColor="purple.400"
                                            />
                                            <FormErrorMessage>{form.errors.user}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="name">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel htmlFor="name">App Name</FormLabel>
                                            <Input
                                                {...field}
                                                id="name"
                                                placeholder="name"
                                                size="lg"
                                                errorBorderColor="crimson"
                                                focusBorderColor="purple.400"
                                            />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="url">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.url && form.touched.url}>
                                            <FormLabel htmlFor="url">
                                                A url to locate the app. This can be a website, bot
                                                listing or invite link.
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                id="url"
                                                placeholder="url"
                                                size="lg"
                                                errorBorderColor="crimson"
                                                focusBorderColor="purple.400"
                                            />
                                            <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="description">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.description && form.touched.description
                                            }>
                                            <FormLabel htmlFor="description">
                                                Describe Your App
                                            </FormLabel>
                                            <Textarea
                                                {...field}
                                                id="description"
                                                placeholder="Describe your app"
                                                errorBorderColor="crimson"
                                                focusBorderColor="purple.400"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.description}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="prefix">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.prefix && form.touched.prefix}>
                                            <FormLabel htmlFor="prefix">
                                                if your app is a bot, state it&apos;s prefix. This
                                                is optional
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                id="prefix"
                                                placeholder="prefix"
                                                size="md"
                                                errorBorderColor="crimson"
                                                focusBorderColor="purple.400"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.prefix}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="terms">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.terms && form.touched.terms}>
                                            <HStack>
                                                <Checkbox {...field} id="terms" />
                                                <FormLabel htmlFor="terms">
                                                    Accept our terms and Conditions Read them:{' '}
                                                    <NextLink url="/terms">Terms</NextLink>
                                                </FormLabel>
                                            </HStack>
                                            <FormErrorMessage>{form.errors.terms}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    m="0 auto"
                                    alignSelf="center"
                                    alignItems="center"
                                    mt={4}
                                    colorScheme="purple"
                                    isLoading={props.isSubmitting}
                                    size="lg"
                                    type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </VStack>
            </Flex>
        </>
    );
}
