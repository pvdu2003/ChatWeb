import PropTypes from "prop-types";
import { Avatar, Box, ListItem, ListItemText, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";

export default function ConversationItem({ chatId, users, lastMessage }) {
  const { authUser } = useAuthContext();
  const { currChat, setCurrChat } = useChatContext();
  const receivers = users.filter((user) => user._id !== authUser._id);
  const isActive = currChat === chatId;

  const clickHandler = () => {
    setCurrChat(chatId);
  };

  return (
    <ListItem
      button
      onClick={clickHandler}
      sx={{ backgroundColor: isActive ? "#ecf4ffff" : "transparent" }}
    >
      <Avatar src={receivers[0]?.avatar} />
      <Box sx={{ paddingLeft: 1, flex: 1 }}>
        <ListItemText
          primary={<span className="fw-bold">{receivers[0]?.full_name}</span>}
          secondary={
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: {
                  sm: "130px",
                  md: "220px",
                },
              }}
            >
              {lastMessage}
            </Typography>
          }
          sx={{ maxWidth: "100%" }}
        />
      </Box>
    </ListItem>
  );
}

ConversationItem.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  lastMessage: PropTypes.string.isRequired,
};
