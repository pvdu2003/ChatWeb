import SearchIcon from "@mui/icons-material/Search";
import { Paper, IconButton, InputBase } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function SearchInput({ onFocus, onBlur, onQueryChange }) {
  const [query, setQuery] = useState("");
  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onQueryChange(newQuery);
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        position: "sticky",
        zIndex: 100,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Chat"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleQueryChange}
        value={query}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
SearchInput.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};
