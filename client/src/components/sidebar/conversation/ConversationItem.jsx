import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  ListItem,
  ListItemText,
  Typography,
  Badge,
  AvatarGroup,
} from "@mui/material";
import { useAuthContext } from "../../../context/AuthContext";
import { useChatContext } from "../../../context/ChatContext";
import { useSocketContext } from "../../../context/SocketContext";

export default function ConversationItem({ chatId, users, lastMessage }) {
  const { authUser } = useAuthContext();
  const { currChat, setCurrChat } = useChatContext();
  const receivers = users.filter((user) => user._id !== authUser._id);
  const isActive = currChat === chatId;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(receivers[0]?._id);

  const clickHandler = () => {
    setCurrChat(chatId);
  };

  return (
    <>
      {lastMessage && (
        <ListItem
          button
          onClick={clickHandler}
          sx={{ backgroundColor: isActive ? "#ecf4ffff" : "transparent" }}
        >
          {" "}
          {receivers.length <= 1 ? (
            <>
              {isOnline ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  color="success"
                >
                  <Avatar src={receivers[0]?.avatar} />
                </Badge>
              ) : (
                <Avatar src={receivers[0]?.avatar} />
              )}
            </>
          ) : (
            <AvatarGroup max={2} spacing={"small"}>
              {receivers.map((receiver, index) => (
                <Avatar src={receiver.avatar} key={index} />
              ))}
            </AvatarGroup>
          )}
          <Box sx={{ paddingLeft: 1, flex: 1 }}>
            <ListItemText
              primary={
                <span className="fw-bold">
                  {receivers.length <= 2
                    ? receivers.map((receiver) => receiver.full_name).join(", ")
                    : `${receivers[0].full_name},  ${
                        receivers.length - 1
                      } more`}
                </span>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: {
                      sm: "76px",
                      md: "140px",
                      lg: "214px",
                    },
                    width: "100%",
                  }}
                >
                  {lastMessage}
                </Typography>
              }
              sx={{ maxWidth: "100%" }}
            />
          </Box>
        </ListItem>
      )}
    </>
  );
}

ConversationItem.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  lastMessage: PropTypes.string,
};
