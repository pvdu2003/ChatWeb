import PropTypes from "prop-types";
import { ListItem, ListItemText, Avatar, Box } from "@mui/material";
import { useChatContext } from "../../../context/ChatContext";
export default function SearchResult({ id, avatar, full_name }) {
  const { setCurrChat } = useChatContext();
  const handleClick = () => {
    setCurrChat(id);
  };
  return (
    <ListItem button key={id} onClick={handleClick}>
      <Avatar src={avatar} />
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
};
