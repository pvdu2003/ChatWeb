import { useState, useEffect } from "react";

import { Paper, List } from "@mui/material";
import SearchResult from "./SearchResult";

import { getAll } from "../../../apis/user";
export default function SearchResults() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const users = await getAll();
      setUsers(users);
    } catch (error) {
      console.error(
        "Error when fetching data in SearchResults Component: " + error
      );
    }
  };

  useEffect(() => {
    fetchAllUsers();
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
          <SearchResult
            key={user._id}
            id={user._id}
            avatar={user.avatar}
            full_name={user.full_name}
          />
        ))}
      </List>
    </Paper>
  );
}
