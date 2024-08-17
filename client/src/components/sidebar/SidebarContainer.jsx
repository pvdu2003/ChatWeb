import { useState } from "react";

import Box from "@mui/material/Box";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";
import ConversationList from "./conversation/ConversationList";
export default function SidebarContainer() {
  const [showResults, setShowResults] = useState(false);

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleInputBlur = () => {
    setShowResults(false);
  };
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
      <SearchInput onFocus={handleInputFocus} onBlur={handleInputBlur} />
      {showResults && <SearchResults />}
      <ConversationList />
    </Box>
  );
}
