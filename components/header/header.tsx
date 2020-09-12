import { useDisclosure } from '@chakra-ui/core';

import AppBar from './app-bar.tsx';
import MyDrawer from './drawer.tsx';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <AppBar onOpen={onOpen} />
            <MyDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
}
