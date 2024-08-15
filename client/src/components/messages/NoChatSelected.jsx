import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "gray.200",
          fontWeight: "bold",
          gap: 1,
        }}
      >
        <Typography variant="h6">Welcome 👋 {authUser.full_name}</Typography>
        <Typography variant="body1">
          Select a chat to start messaging
        </Typography>
      </Box>
    </Box>
  );
};

export default NoChatSelected;
