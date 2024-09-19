import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Paper,
  Box,
  AvatarGroup,
  Collapse,
  MenuItem,
  List,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { useChatContext } from "../../context/ChatContext";

export default function MessageHeader({ users }) {
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const { setSelectedUsers } = useChatContext();

  const receivers = users?.filter((user) => user._id !== authUser._id);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleMenuItemClick = (option) => {
    setSelectedUsers(receivers.map((receiver) => receiver._id));
    navigate("/" + option);
    setOpen(false); // Close the menu after an option is clicked
  };
  useEffect(() => {
    setOpen(false);
  }, [users]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        position: "sticky",
        top: 16,
        left: 16,
        height: 56,
        width: "100%",
        zIndex: 100,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          p: 0.5,
        }}
      >
        {receivers?.length > 0 ? (
          <>
            {receivers.length === 1 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {receivers.map((receiver, index) => (
                  <Badge
                    key={receiver._id}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color={onlineUsers.includes(receiver._id) ? "success" : ""}
                    sx={{ marginRight: index > 0 ? 1 : 0 }}
                  >
                    <Avatar src={receiver.avatar} />
                  </Badge>
                ))}
                <Box sx={{ paddingLeft: 1.2 }}>
                  <p className="m-0 fw-bold">{receivers[0]?.full_name}</p>
                </Box>
              </Box>
            ) : (
              <AvatarGroup max={2}>
                {receivers.map((receiver, index) => (
                  <Avatar src={receiver.avatar} key={index} />
                ))}
              </AvatarGroup>
            )}
          </>
        ) : (
          <Box sx={{ paddingLeft: 1.2 }}>
            <p className="m-0 fw-bold">No recipients</p>
          </Box>
        )}
        <IconButton onClick={handleToggle}>
          <MoreVertIcon sx={{ cursor: "pointer" }} />
        </IconButton>
      </Paper>

      <Collapse in={open}>
        <Box
          sx={{
            position: "absolute",
            width: "240px",
            right: 0,
            top: "100%",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 1,
            zIndex: 10,
          }}
        >
          {receivers.length === 1 ? (
            <List>
              <MenuItem onClick={() => handleMenuItemClick("create")}>
                Create group chat with {receivers[0].username}
              </MenuItem>
            </List>
          ) : (
            <List>
              <MenuItem onClick={() => handleMenuItemClick("manage")}>
                Manage chat
              </MenuItem>
            </List>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

MessageHeader.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      full_name: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};
