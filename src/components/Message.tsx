import React from "react";
import { formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";

type MessageContent = {
  text?: string;
  createdAt?: Timestamp;
  displayName?: string;
  photoURL?: string;
};

const formatDate = (date: Date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

export const Message = ({
  text,
  createdAt,
  displayName,
  photoURL,
}: MessageContent) => {
  return (
    <Flex align="center">
      {photoURL ? (
        <Avatar
          src={photoURL}
          name={displayName}
          width={45}
          height={45}
          marginRight={4}
          borderRadius={22}
        />
      ) : null}
      <Box border="solid" borderColor="gray.200" borderRadius={16} padding={2} width={240} backgroundColor="gray.800">
        <Box display="flex" justifyContent="flex-start">
          {displayName ? (
            <Text as="p" fontSize="xs" color="gray.400">{displayName}</Text>
          ) : null}
        </Box>

          <Text as="p" fontSize="lg" fontWeight="bold">{text}</Text>

          <Box display="flex" justifyContent="flex-end">
          {createdAt?.seconds ? (
            <Text as="span" fontSize="xs" color="gray.400">
              {formatDate(new Date(createdAt.seconds * 1000))}
            </Text>
          ) : null}
        </Box>

      </Box>
    </Flex>
  );
};
