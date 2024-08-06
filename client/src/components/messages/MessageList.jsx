import PropTypes from "prop-types";

import { List } from "@mui/material";
import MessageItem from "./MessageItem";

export default function Messages({ messages }) {
  return (
    <List
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        width: "100%",
      }}
    >
      {messages.map((message, index) => (
        <MessageItem message={message} key={index} index={index} />
      ))}
    </List>
  );
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};
