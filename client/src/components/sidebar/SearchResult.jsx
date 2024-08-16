import { useState, useEffect } from "react";

import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";

import { getAll } from "../../apis/user";
export default function SearchResult() {
  const [users, setUsers] = useState([]);

  const fetchAllChat = async () => {
    try {
      const data = await getAll();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllChat();
  }, []);

  return (
    <Paper
      sx={{
        marginTop: 9,
        top: 0,
        bgcolor: "white",
        position: "absolute",
        width: "100%",
        zIndex: 110,
      }}
      elevation={4}
    >
      <List
        sx={{
          backgroundColor: "white",
        }}
      >
        {users.map((user) => (
          <ListItem button key={user._id}>
            <Avatar src={user.avatar} />
            <Box sx={{ paddingLeft: 1, flex: 1 }}>
              <ListItemText
                primary={
                  <span className="fw-bold ms-2">{user?.full_name}</span>
                }
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
