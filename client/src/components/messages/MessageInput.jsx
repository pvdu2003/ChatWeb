import { useState, useEffect } from "react";

import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { sendMessage } from "../../apis/message";
export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { currChat, messages, setMessages } = useChatContext();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      let chatDetail = data.message.chat;
      let senderInfo = data.message.getSender;
      setMessages((prevMessages) => [...prevMessages, senderInfo]);
      if (
        !currChat ||
        data.chatId !== currChat ||
        (chatDetail.users.includes(authUser._id) &&
          senderInfo.sender_id._id !== authUser._id)
      ) {
        // Show notification for new messages in other chats
        toast(
          `New message from ${senderInfo.sender_id.full_name}: ${senderInfo.message}`,
          { position: "bottom-left", autoClose: 2000 }
        );
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages]);
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
