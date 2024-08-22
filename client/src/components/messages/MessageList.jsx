import PropTypes from "prop-types";

import { List, Typography, Box } from "@mui/material";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  return (
    <List
      sx={{
        flexGrow: 1,
        overflow: "auto",
        width: "100%",
        maxHeight: "85vh",
        mt: 2.4,
      }}
    >
      {messages?.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            color: "gray.200",
            fontWeight: "bold",
            gap: 1,
          }}
        >
          <Typography variant="body1">
            No messages in this chat! Send something to this user!
          </Typography>
        </Box>
      ) : (
        messages?.map((message, index) => (
          <MessageItem message={message} key={index} index={index} />
        ))
      )}
    </List>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      sender_id: PropTypes.object,
      message: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ),
};
