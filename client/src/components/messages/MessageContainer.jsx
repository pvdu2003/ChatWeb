import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import MessageHeader from "./MessageHeader";
import { getById } from "../../apis/chat";
import { useChatContext } from "../../context/ChatContext";
import NoChatSelected from "./NoChatSelected";

export default function MessageContainer() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { currChat } = useChatContext();

  const fetchChat = async () => {
    if (!currChat) return;
    try {
      const data = await getById(currChat);
      setUsers(data.users);
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currChat]);
  return (
    <>
      {currChat ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "100vh",
            bgcolor: "background.default",
            px: 2,
            position: "relative",
          }}
        >
          <MessageHeader users={users} />
          <MessageList messages={messages} />
          <MessageInput />
        </Box>
      ) : (
        <NoChatSelected />
      )}
    </>
  );
}
