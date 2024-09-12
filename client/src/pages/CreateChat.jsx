import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAll } from "../apis/user";
import { createGroupChat } from "../apis/chat";
import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatContext";

const CreateChat = () => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]); // All users from the system
  const [filteredUsers, setFilteredUsers] = useState([]); // Users based on search input
  const [selectedUsers, setSelectedUsers] = useState([]); // Selected users for chat
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const { setCurrChat } = useChatContext();
  const { onlineUsers } = useSocketContext();

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        let users;
        //   if (query) {
        //     users = await getAll(query);
        //   } else {
        users = await getAll();
        //   }
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
      const response = await createGroupChat(selectedUsers);
      toast.success("Create chat successfully!!!", { autoClose: 1500 });
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
      <Typography variant="h6">Create Group Chat</Typography>
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
        {filteredUsers.map((user) => (
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
                primary={<span className="fw-bold ms-2">{user.full_name}</span>}
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
            <Avatar key={userId} src={user?.avatar} sx={{ marginRight: 1 }} />
          );
        })}
      </List>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Create Group Chat
      </Button>
    </Box>
  );
};

export default CreateChat;
