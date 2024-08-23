import PropTypes from "prop-types";
import { ListItem, ListItemText, Avatar, Box, Badge } from "@mui/material";
import { useChatContext } from "../../../context/ChatContext";
import { useSocketContext } from "../../../context/SocketContext";
export default function SearchResult({
  id,
  avatar,
  full_name,
  setShowResults,
}) {
  const { setCurrChat } = useChatContext();
  const { onlineUsers } = useSocketContext();
  const handleClick = () => {
    setCurrChat(id);
    setShowResults(false);
  };
  return (
    <ListItem button key={id} onClick={handleClick}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color={onlineUsers.includes(id) ? "success" : ""}
      >
        <Avatar src={avatar} />
      </Badge>
      <Box sx={{ paddingLeft: 1, flex: 1 }}>
        <ListItemText
          primary={<span className="fw-bold ms-2">{full_name}</span>}
        />
      </Box>
    </ListItem>
  );
}

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  setShowResults: PropTypes.func,
};
