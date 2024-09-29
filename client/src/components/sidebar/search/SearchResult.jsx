import PropTypes from "prop-types";
import { ListItem, ListItemText, Avatar, Box, Badge } from "@mui/material";
import { useChatContext } from "../../../context/ChatContext";
import { useSocketContext } from "../../../context/SocketContext";
export default function SearchResult({ user, setShowResults }) {
  const { setCurrChat } = useChatContext();
  const { onlineUsers } = useSocketContext();
  const handleClick = () => {
    setCurrChat(user._id);
    setShowResults(false);
  };
  return (
    <ListItem button key={user._id} onClick={handleClick}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color={onlineUsers.includes(user._id) ? "success" : ""}
      >
        <Avatar src={user.avatar} />
      </Badge>
      <Box sx={{ paddingLeft: 1, flex: 1 }}>
        <ListItemText
          primary={<span className="fw-bold ms-2">{user.full_name}</span>}
        />
      </Box>
    </ListItem>
  );
}

SearchResult.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
  setShowResults: PropTypes.func,
};
