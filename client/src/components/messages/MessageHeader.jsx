import { Avatar, Badge, Paper, Box } from "@mui/material";

export default function MessageHeader() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        position: "sticky",
        top: 16,
        left: 16,
        height: 56,
        width: "100%",
        zIndex: 100,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          p: 0.5,
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color="success"
        >
          <Avatar src="https://avatar.iran.liara.run/public/boy?username=david" />
        </Badge>
        <Box sx={{ paddingLeft: 1.2 }}>
          <p className="m-0 fw-bold">Name of conversation</p>
        </Box>
      </Paper>
    </Box>
  );
}
