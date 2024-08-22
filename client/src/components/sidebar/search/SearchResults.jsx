import { useState, useEffect } from "react";

import { List } from "@mui/material";
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
    <>
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
    </>
  );
}
