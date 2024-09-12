import PropTypes from "prop-types";
import { Avatar, Badge, Paper, Box, AvatarGroup } from "@mui/material";

import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

export default function MessageHeader({ users }) {
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const receivers = users?.filter((user) => user._id !== authUser._id);
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
        {receivers?.length > 0 ? (
          <>
            {receivers.length === 1 ? (
              <>
                {receivers.map((receiver, index) => (
                  <Badge
                    key={receiver._id}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color={onlineUsers.includes(receiver._id) ? "success" : ""}
                    sx={{ marginRight: index > 0 ? 1 : 0 }}
                  >
                    <Avatar src={receiver.avatar} />
                  </Badge>
                ))}
                <Box sx={{ paddingLeft: 1.2 }}>
                  <p className="m-0 fw-bold">{receivers[0]?.full_name}</p>
                </Box>
              </>
            ) : (
              <AvatarGroup max={2}>
                {receivers.map((receiver, index) => (
                  <Avatar src={receiver.avatar} key={index} />
                ))}
              </AvatarGroup>
            )}
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
      _id: PropTypes.string,
      username: PropTypes.string,
      full_name: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};
