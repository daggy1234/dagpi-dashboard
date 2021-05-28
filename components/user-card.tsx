import {
    Box,
    Image,
    List,
    ListIcon,
    ListItem,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { AiFillTag, AiOutlineMail } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';
import { MdPermIdentity } from 'react-icons/md';

interface UserCardProps {
    name: string;
    image: string;
    email: string;
    discord_id: string;
    client_id: string;
    created: string;
}

const UserCard: React.FC<UserCardProps> = (props) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            mx={{ md: 8 }}
            display={{ md: 'flex' }}
            borderWidth="2px"
            borderRadius="lg"
            maxW={{ md: '2xl' }}
            rounded={{ md: 'lg' }}>
            <Box w={{ md: '40%' }}>
                <Box height={64} rounded={{ md: 'lg' }} bgSize="cover">
                    <Image
                        boxSize="2xs"
                        objectFit="cover"
                        name={props.name}
                        src={`${props.image}?size=1024`}
                    />
                </Box>
            </Box>

            <Box py={12} px={6} maxW={{ base: 'xl', md: '5xl' }} w={{ md: '60%' }}>
                <List mt={3} spacing={3}>
                    <ListItem>
                        <ListIcon as={AiFillTag} />
                        {props.name}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={AiOutlineMail} />
                        {props.email}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={GoSignIn} />
                        {props.created} ago
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FaDiscord} />
                        {props.discord_id}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdPermIdentity} />
                        {props.client_id}
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default UserCard;
