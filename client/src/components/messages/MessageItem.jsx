import PropTypes from "prop-types";
import { useState } from "react";
import {
  Grid,
  Box,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { deleteMessage, updateMessage } from "../../apis/message";

export default function MessageItem({ message, onDelete, onUpdate }) {
  const { authUser } = useAuthContext();
  const fromMe = authUser._id === message.sender_id._id;
  const formattedTime = extractTime(message.createdAt);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message.message);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    const resp = await deleteMessage(message._id);
    if (resp.status === 200) {
      toast.success(resp.data.message, { autoClose: 1500 });
      onDelete(message._id);
    }
  };

  const handleUpdate = async () => {
    const resp = await updateMessage(message._id, newMessage);
    if (resp.status === 200) {
      toast.success(resp.data.message, { autoClose: 1500 });
      onUpdate({ ...message, message: newMessage });
      setIsEditing(false);
    }
  };

  return (
    <ListItem
      sx={{ padding: [0, 0.2] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid container justifyContent={!fromMe ? "flex-start" : "flex-end"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          {isEditing ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleUpdate}>
                <DoneIcon />
              </IconButton>
              <IconButton onClick={() => setIsEditing(false)}>
                <CloseIcon />
              </IconButton>
              <TextField
                variant="standard"
                value={newMessage}
                multiline
                maxRows={4}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ marginLeft: 1, flexGrow: 1, maxWidth: "800px" }}
              />
            </Box>
          ) : (
            <>
              {open && isHovered && fromMe && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    left: -85,
                    zIndex: 10,
                    padding: "0.5rem",
                  }}
                >
                  <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              {isHovered && fromMe && (
                <IconButton
                  sx={{
                    color: "black",
                    marginRight: "0.5rem",
                  }}
                  onClick={handleToggle}
                >
                  <MoreVertIcon />
                </IconButton>
              )}
              <Tooltip
                title={
                  !fromMe
                    ? `By ${message.sender_id.full_name} at ${formattedTime}`
                    : `At ${formattedTime}`
                }
                arrow
                placement="top"
              >
                <Box
                  sx={{
                    backgroundColor: !fromMe ? "#f0f0f0" : "blue",
                    paddingX: "0.75rem",
                    paddingY: "0.25rem",
                    borderRadius: !fromMe
                      ? "10px 10px 10px 0"
                      : "10px 10px 0 10px",
                    color: !fromMe ? "#000" : "white",
                    textAlign: "left",
                    width: "fit-content",
                    maxWidth: "18rem",
                  }}
                >
                  <ListItemText>{message.message}</ListItemText>
                </Box>
              </Tooltip>
            </>
          )}
        </Box>
      </Grid>
    </ListItem>
  );
}

MessageItem.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender_id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
