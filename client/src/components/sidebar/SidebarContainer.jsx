import axios from "axios";
import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchInput from "./SearchInput";
import ConversationList from "./ConversationList";
export default function SidebarContainer() {
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`);
      // Remove the token from local storage or cookie
      localStorage.removeItem("token");
      // Redirect the user to the login page or the home page
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  const list = [
    {
      name: "User 1",
      lastMessage: "Hello, how are you?",
    },
    {
      name: "User 1",
      lastMessage: "He you?",
    },
    {
      name: "User 5",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 21",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 1",
      lastMessage: "Hello, how are you?",
    },
    {
      name: "User 1",
      lastMessage: "He you?",
    },
    {
      name: "User 5",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 21",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 1",
      lastMessage: "Hello, how are you?",
    },
    {
      name: "User 1",
      lastMessage: "He yoello, how are you?u?",
    },
    {
      name: "User 5",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 21",
      lastMessage: "Helloello, how are you?, hoyou?",
    },
    {
      name: "User 1",
      lastMessage: "Helello, how are you?lo, how are you?",
    },
    {
      name: "User 1",
      lastMessage: "He yello, how are you?ou?",
    },
    {
      name: "User 5",
      lastMessage: "Hello, hoyou?",
    },
    {
      name: "User 21",
      lastMessage: "Hello, hello, how are you?oyou?",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "between",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <SearchInput />
      <ConversationList list={list} />
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
