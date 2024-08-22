import PropTypes from "prop-types";

import { List, Typography, Box, Divider } from "@mui/material";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  const formatMessages = () => {
    let groupedMessages = [];
    const currYear = new Date().getFullYear();
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt);
      let msgDate = date.toDateString();
      const msgYear = date.getFullYear();
      // console.log(msgYear, currYear);
      if (msgYear === currYear) {
        msgDate = msgDate.split(" ").slice(0, 3).join(" ");
        console.log(msgDate);
      }

      const lastGroup = groupedMessages[groupedMessages.length - 1];

      if (!lastGroup || lastGroup.date !== msgDate || msgYear !== currYear) {
        groupedMessages.push({ date: msgDate, messages: [msg] });
      } else {
        lastGroup.messages.push(msg);
      }
    });
    return groupedMessages;
  };
  const groupedMessages = formatMessages();

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
      {groupedMessages?.length === 0 ? (
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
        <>
          {groupedMessages.map((formatMessage, id) => {
            return (
              <Box key={id}>
                <Divider>{formatMessage?.date}</Divider>
                {formatMessage?.messages?.map((message) => {
                  return (
                    <Box key={message._id}>
                      <MessageItem message={message} />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </>
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
