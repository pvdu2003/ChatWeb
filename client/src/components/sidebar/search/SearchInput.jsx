import SearchIcon from "@mui/icons-material/Search";
import { Paper, IconButton, InputBase } from "@mui/material";
import PropTypes from "prop-types";
export default function SearchInput({ onFocus, onBlur }) {
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
};
