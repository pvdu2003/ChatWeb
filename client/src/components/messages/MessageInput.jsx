import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useChatContext } from "../../context/ChatContext";
import { sendMessage } from "../../apis/message";
export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { currChat } = useChatContext();
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(currChat, message);
    setMessage("");
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
