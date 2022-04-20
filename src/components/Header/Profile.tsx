import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const { displayName, photoURL, email } = user;
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{displayName}</Text>
        <Text fontSize="sm" color="gray.300">
          {email}
        </Text>
      </Box>

    {photoURL && displayName ? (
            <Avatar
            size="md"
            name={displayName}
            src={photoURL}
          />
    ) : 
    <Avatar />
    }
    </Flex>
  );
}
