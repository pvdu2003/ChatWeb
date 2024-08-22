import { useState, useRef } from "react";

import { Box, Paper } from "@mui/material";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";
import ConversationList from "./conversation/ConversationList";
export default function SidebarContainer() {
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null); // Create a ref for SearchResults

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleInputBlur = (event) => {
    // Check if the click is inside the results
    if (
      resultsRef.current &&
      resultsRef.current.contains(event.relatedTarget)
    ) {
      return; // If it is, don't hide results
    } else {
      // Otherwise hide the results
      setShowResults(false);
    }
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
      {/* {showResults && <SearchResults />} */}
      {showResults && (
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
          ref={resultsRef}
        >
          {/* Attach the ref to the results container */}
          <SearchResults />
        </Paper>
      )}
      <ConversationList />
    </Box>
  );
}
