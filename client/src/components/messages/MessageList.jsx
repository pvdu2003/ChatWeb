import PropTypes from "prop-types";

import { List } from "@mui/material";
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
      {messages.map((message, index) => (
        <MessageItem message={message} key={index} index={index} />
      ))}
    </List>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      sender_id: PropTypes.object.isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};
