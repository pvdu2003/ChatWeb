import PropTypes from "prop-types";

import { Avatar, Box } from "@mui/material";

export default function ConversationItem({ name, lastMessage }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "between",
        paddingY: 2,
        paddingX: 1,
        width: "100%",
      }}
    >
      <Avatar src="https://avatar.iran.liara.run/public/boy?username=david" />
      <Box sx={{ paddingLeft: 1 }}>
        <p className="m-0 fw-bold">{name}</p>
        <p className="m-0 text-truncate" style={{ maxWidth: "14rem" }}>
          {lastMessage}
        </p>
      </Box>
    </Box>
  );
}
ConversationItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
};
