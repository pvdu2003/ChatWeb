import axios from "axios";
import { Avatar, Box, IconButton } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOpenIcon />
      </Avatar>
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
