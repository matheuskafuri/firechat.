import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { Logo } from './Logo';
import { Profile } from './Profile';

interface HeaderProps {
    user: User;
  }

export function Header({ user }: HeaderProps) {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
            justify="space-between"
        >

            <Logo />
            <Flex align="center" ml="auto">
                <Profile user={user} />
            </Flex>

        </Flex>
    );
}