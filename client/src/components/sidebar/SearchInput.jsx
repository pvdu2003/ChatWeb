import SearchIcon from "@mui/icons-material/Search";
import { Paper, IconButton, InputBase } from "@mui/material";

export default function SearchInput() {
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
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Chat" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
