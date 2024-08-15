import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import MessageHeader from "./MessageHeader";
import { getById } from "../../apis/chat";
export default function MessageContainer() {
  const [messages, setMessages] = useState([]);

  const fetchChat = async () => {
    try {
      const data = await getById("66bcb52e18294eb9483320a7");
      console.log(data.messages);
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);
  return (
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
      <MessageHeader />
      <MessageList messages={messages} />
      <MessageInput />
    </Box>
  );
}
