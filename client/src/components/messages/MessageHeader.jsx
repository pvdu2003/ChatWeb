import PropTypes from "prop-types";
import { Avatar, Badge, Paper, Box } from "@mui/material";

import { useAuthContext } from "../../context/AuthContext";

export default function MessageHeader({ users }) {
  const { authUser } = useAuthContext();
  const receivers = users.filter((user) => user._id !== authUser._id);

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
        {receivers.length > 0 ? (
          <>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color="success"
            >
              <Avatar src={receivers[0].avatar} />
            </Badge>
            <Box sx={{ paddingLeft: 1.2 }}>
              <p className="m-0 fw-bold">{receivers[0].full_name}</p>
            </Box>
          </>
        ) : (
          <Box sx={{ paddingLeft: 1.2 }}>
            <p className="m-0 fw-bold">No recipients</p>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

MessageHeader.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};
