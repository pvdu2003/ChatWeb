import PropTypes from "prop-types";

import { Avatar, Box } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
export default function ConversationItem({ users, lastMessage }) {
  const { authUser } = useAuthContext();
  const receivers = users.filter((user) => user._id !== authUser._id);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "between",
        padding: 1,
      }}
    >
      <Avatar src={receivers[0]?.avatar} />
      <Box sx={{ paddingLeft: 1 }}>
        <p className="m-0 fw-bold">{receivers[0]?.full_name}</p>
        <p className="m-0 text-truncate" style={{ maxWidth: "14rem" }}>
          {lastMessage}
        </p>
      </Box>
    </Box>
  );
}
ConversationItem.propTypes = {
  users: PropTypes.array.isRequired,
  lastMessage: PropTypes.string.isRequired,
};
