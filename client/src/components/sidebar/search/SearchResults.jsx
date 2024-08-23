import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { List, Typography } from "@mui/material";
import SearchResult from "./SearchResult";

import { getAll } from "../../../apis/user";
export default function SearchResults({ query, setShowResults }) {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      let users;
      if (query) {
        users = await getAll(query);
      } else {
        users = await getAll();
      }
      setUsers(users);
    } catch (error) {
      console.error(
        "Error when fetching data in SearchResults Component: " + error
      );
    }
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <List
        sx={{
          backgroundColor: "white",
        }}
      >
        {users.length === 0 ? (
          <Typography align="center">No users found.</Typography>
        ) : (
          <>
            {users.map((user) => (
              <SearchResult
                key={user._id}
                id={user._id}
                avatar={user.avatar}
                full_name={user.full_name}
                setShowResults={setShowResults}
              />
            ))}
          </>
        )}
      </List>
    </>
  );
}
SearchResults.propTypes = {
  query: PropTypes.string,
  setShowResults: PropTypes.func,
};
