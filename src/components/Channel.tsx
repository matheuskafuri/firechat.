import React, { FormEvent, useEffect, useState } from "react";
import { Button, Input, Flex, List, ListItem, Box } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { Message as MessageComponent } from "./Message";

type Message = {
  data: DocumentData;
  id: string;
};

type ChannelProps = {
  user: User;
  db: any;
};

async function getMessages(db: any) {
  let data: Message[] = [];
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection, orderBy("createdAt", "asc"), limit(100));
  const messageSnapshot = await getDocs(q);
  messageSnapshot.forEach((doc) => {
    data.push({
      data: doc.data(),
      id: doc.id,
    });
  });
  return data;
}

export const Channel = ({ user, db }: ChannelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    const results = getMessages(db);
    results.then((result) => setMessages(result));
  }, [db, newMessage]);

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      try {
        await addDoc(collection(db, "messages"), {
          text: trimmedMessage,
          createdAt: new Date(),
          uid,
          displayName,
          photoURL,
        });
      } catch (error) {
        console.log(error);
      }

      setNewMessage("");
    }
  };

  return (
    <>
      <Box overflow="auto" height={480}>
        <List spacing={6}>
          {messages.map((message) => {
            return (
              <ListItem key={message.id}>
                <MessageComponent {...message.data} />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Flex
        align="center"
        as="form"
        flexDir="row"
        maxWidth={720}
        mt="6"
        onSubmit={handleOnSubmit}
      >
        <Input
          placeholder="Type your message here..."
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          size="lg"
          height="48px"
        />
        <Button
          type="submit"
          disabled={!newMessage}
          colorScheme="messenger"
          marginLeft="10"
          size="lg"
          height="48px"
        >
          Send
        </Button>
      </Flex>
    </>
  );
};
