import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { List, Typography, Box, Divider, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MessageItem from "./MessageItem";
import { useChatContext } from "../../context/ChatContext";

export default function MessageList({ messages }) {
  const chatContainerRef = useRef(null);
  const { setMessages } = useChatContext();
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    scrollToBottom();
    return () => {
      setShowScrollToBottom(false);
    };
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const handleScroll = () => {
    if (chatContainerRef.current) {
      setShowScrollToBottom(
        chatContainerRef.current.scrollTop + 1.5 <
          chatContainerRef.current.scrollHeight -
            chatContainerRef.current.clientHeight
      );
    }
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
    setShowScrollToBottom(false);
  };
  const formatMessages = () => {
    let groupedMessages = [];
    const currYear = new Date().getFullYear();
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt);
      let msgDate = date.toDateString();
      const msgYear = date.getFullYear();
      if (msgYear === currYear) {
        msgDate = msgDate.split(" ").slice(0, 3).join(" ");
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

  const handleDeleteMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== id)
    );
  };
  const handleUpdateMessage = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message._id === updatedMessage._id ? updatedMessage : message
      )
    );
  };
  return (
    <Box sx={{ position: "relative" }}>
      <List
        ref={chatContainerRef}
        onScroll={handleScroll}
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
                        <MessageItem
                          message={message}
                          onDelete={handleDeleteMessage}
                          onUpdate={handleUpdateMessage}
                        />
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </>
        )}
      </List>
      {showScrollToBottom && (
        <IconButton
          sx={{
            position: "absolute",
            border: "1px solid #999",
            bottom: "16px",
            right: "50%",
            zIndex: 1,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
          }}
          color="primary"
          onClick={handleScrollToBottom}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Box>
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
