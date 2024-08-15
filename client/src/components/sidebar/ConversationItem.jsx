import PropTypes from "prop-types";

import { Avatar, Box, Button } from "@mui/material";
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
    <Button
      sx={{
        textAlign: "left",
        color: "black",
        padding: 1,
        backgroundColor: isActive ? "#ecf4ffff" : "transparent",
      }}
      color="secondary"
      onClick={clickHandler}
    >
      <Avatar src={receivers[0]?.avatar} />
      <Box sx={{ paddingLeft: 1 }}>
        <p className="m-0 fw-bold">{receivers[0]?.full_name}</p>
        <p className="m-0 text-truncate" style={{ maxWidth: "14rem" }}>
          {lastMessage}
        </p>
      </Box>
    </Button>
  );
}
ConversationItem.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  lastMessage: PropTypes.string.isRequired,
};
