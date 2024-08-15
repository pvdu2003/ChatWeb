import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import ConversationList from "./ConversationList";
import { getAll } from "../../apis/chat";
export default function SidebarContainer() {
  const [list, setList] = useState([]);
  const fetchAllChat = async () => {
    try {
      const data = await getAll();
      console.log(data);

      setList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllChat();
  }, []);
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
      <ConversationList list={list} />
    </Box>
  );
}
