import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { List, Typography, Box, Divider, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MessageItem from "./MessageItem";
import { useChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContext";

export default function MessageList({ messages }) {
  const chatContainerRef = useRef(null);
  const { setMessages } = useChatContext();
  const { authUser } = useAuthContext();
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
    const groupedMessages = {};

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt);
      const dateString = date.toDateString();
      const senderId = msg.sender_id._id;

      // Initialize date group if it doesn't exist
      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = {};
      }

      // Initialize sender group if it doesn't exist
      if (!groupedMessages[dateString][senderId]) {
        groupedMessages[dateString][senderId] = {
          sender_id: msg.sender_id,
          messages: [],
        };
      }
      // Add the message to the sender's group
      groupedMessages[dateString][senderId].messages.push(msg);
    });

    // Convert the object into an array
    return Object.entries(groupedMessages).map(([date, senders]) => ({
      date,
      senders: Object.values(senders),
    }));
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
        {groupedMessages.length === 0 ? (
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
            {groupedMessages.map((group, idx) => (
              <Box key={idx} sx={{ margin: "10px 0" }}>
                <Divider>{group.date}</Divider>
                {group.senders.map((sender, senderIdx) => (
                  <Box key={senderIdx} sx={{ margin: "10px 0" }}>
                    {sender.messages.map((message) => (
                      <MessageItem
                        key={message._id}
                        message={message}
                        onDelete={handleDeleteMessage}
                        onUpdate={handleUpdateMessage}
                      />
                    ))}
                    {sender.sender_id._id != authUser._id && (
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        {sender.sender_id.full_name}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
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
      _id: PropTypes.string.isRequired,
      sender_id: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        full_name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
};
