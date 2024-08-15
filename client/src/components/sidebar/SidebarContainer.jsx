import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import ConversationList from "./ConversationList";
export default function SidebarContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "between",
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: 2,
      }}
    >
      <SearchInput />
      <ConversationList />
    </Box>
  );
}
