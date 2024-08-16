import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ConversationList from "./ConversationList";
export default function SidebarContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "between",
        position: "relative",
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: 2,
      }}
    >
      <SearchInput />
      <SearchResult />
      <ConversationList />
    </Box>
  );
}
