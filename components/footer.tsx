import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/core';
import { IconContext } from 'react-icons';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { FaDiscord, FaPatreon } from 'react-icons/fa';
import { GiIndianPalace } from 'react-icons/gi';
import { GrDocument } from 'react-icons/gr';

import { version } from '../package.json';
import styles from './footer.module.scss';
import Link from './Link';
import NextLink from './NextLink';
const Icon = (props) => {
    return (
        <IconContext.Provider value={{ color: props.color, className: props.name, size: '2em' }}>
            <div>{props.children}</div>
        </IconContext.Provider>
    );
};
export const Footer = () => (
    <Box as="footer" mt={12} textAlign="center" mb={6}>
        <Text fontSize="sm">
            By <strong> Daggy</strong>
        </Text>
        <Stack mt={4} direction="row" spacing="12px" justify="center">
            <span>
                <Link url="https://github.com/daggy1234/dagpi">
                    <Icon color={useColorModeValue('black', 'white')} name="github">
                        <AiFillGithub />
                    </Icon>
                </Link>
            </span>
            <span>
                <Link url="https://server.daggy.tech">
                    <Icon color="#7289DA" name="discord">
                        <FaDiscord />
                    </Icon>
                </Link>
            </span>
            <span>
                <Link url="https://patreon.daggy.tech">
                    <Icon color="#ff4f00" name="patreon">
                        <FaPatreon />
                    </Icon>
                </Link>
            </span>
            <span>
                <Link url="mailto:contact@dagpi.xyz">
                    <Icon color="#1da1f2" name="patreon">
                        <AiOutlineMail />
                    </Icon>
                </Link>
            </span>
            <span>
                <NextLink url="/terms">
                    <Icon color="pink.300" name="terms">
                        <GrDocument />
                    </Icon>
                </NextLink>
            </span>
        </Stack>
    </Box>
);

export default Footer;
