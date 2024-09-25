import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAll } from "../apis/user";
import { updateGroupChat } from "../apis/chat";
import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatContext";

const ManageChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [allUsers, setAllUsers] = useState([]); // All users from the system
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const { setCurrChat, selectedUsers, setSelectedUsers } = useChatContext();
  const { onlineUsers } = useSocketContext();

  const [openModal, setOpenModal] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState(null);
  const [userToRemove, setUserToRemove] = useState(null);

  const handleRemoveUser = (userId) => {
    const user = allUsers.find((u) => u._id === userId);
    setUserIdToRemove(userId);
    setUserToRemove(user);
    setOpenModal(true);
  };

  const handleConfirmRemove = () => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userIdToRemove));
    setOpenModal(false);
  };

  const handleCancelRemove = () => {
    setOpenModal(false);
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        let users = await getAll();
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error(
          "Error when fetching data in SearchResults Component: " + error
        );
      }
    };

    fetchAllUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Filter users based on the search term
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle user selection
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // Deselect user
      } else {
        return [...prev, userId]; // Select user
      }
    });
  };

  // Handle form submission to create group chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user to create a chat.");
      return;
    }
    try {
      const response = await updateGroupChat(selectedUsers, id);
      toast.success("Update chat successfully!!!", { autoClose: 1500 });
      setCurrChat(response._id);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred while creating the chat."
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h6">Update Group Chat</Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <Typography variant="subtitle1">Available Users</Typography>
      <List>
        {filteredUsers
          .filter((user) => !selectedUsers.includes(user._id)) // Filter out selected users
          .map((user) => (
            <ListItem
              button
              key={user._id}
              onClick={() => {
                toggleUserSelection(user._id);
              }}
            >
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
                  primary={
                    <span className="fw-bold ms-2">{user.full_name}</span>
                  }
                />
              </Box>
            </ListItem>
          ))}
      </List>

      <Typography variant="subtitle1">Selected Users</Typography>
      <List sx={{ display: "flex", alignItems: "flex-start" }}>
        {selectedUsers.map((userId) => {
          const user = allUsers.find((u) => u._id === userId);
          return (
            <Badge
              key={userId}
              overlap="circular"
              badgeContent={
                <IconButton
                  onClick={() => handleRemoveUser(userId)}
                  sx={{ padding: 0, color: "error.main" }}
                >
                  <RemoveCircleOutlineIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar src={user?.avatar} sx={{ marginRight: 1 }} />
            </Badge>
          );
        })}
      </List>
      <Dialog
        open={openModal}
        onClose={handleCancelRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Remove ${userToRemove?.full_name} from Chat?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {userToRemove?.full_name} from the
            chat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Update Chat
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginTop: 2, ml: 2 }}
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default ManageChat;
