import { useState, useEffect } from "react";

import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useChatContext } from "../../context/ChatContext";
import { useSocketContext } from "../../context/SocketContext";
import { sendMessage } from "../../apis/message";
export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { currChat, setMessages } = useChatContext();
  const { socket } = useSocketContext();
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message.getSender]);
    });
    return () => socket.off("receiveMessage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        // Save the message to the database
        const savedMessage = await sendMessage(currChat, message);
        console.log(savedMessage);

        // Emit the message only after it's saved
        socket.emit("sendMessage", {
          chatId: currChat,
          message: savedMessage,
        });

        // Clear the input after sending
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        width: "100%",
        position: "sticky",
        bottom: 0,
        mb: 2.5,
      }}
    >
      <TextField
        variant="outlined"
        id="message"
        name="message"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        sx={{ flexGrow: 1, mr: 2 }}
        size="small"
      />

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Box>
  );
}
