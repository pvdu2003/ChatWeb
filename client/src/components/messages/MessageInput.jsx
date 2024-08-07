import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function MessageInput() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage("");
    }
  };
  return (
    <Box
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
        placeholder="Type your message..."
        value={newMessage}
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
