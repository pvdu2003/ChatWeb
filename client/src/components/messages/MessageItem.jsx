import PropTypes from "prop-types";

import { Grid, Box, ListItem, ListItemText, Tooltip } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
export default function MessageItem({ index, message }) {
  const { authUser } = useAuthContext();
  const fromMe = authUser._id === message.sender_id._id;
  return (
    <ListItem key={index} sx={{ padding: [0, 0.2] }}>
      <Grid container justifyContent={fromMe ? "flex-start" : "flex-end"}>
        <Grid
          item
          container
          justifyContent={fromMe ? "flex-start" : "flex-end"}
        >
          <Tooltip title="Add" placement="left">
            <Box
              sx={{
                backgroundColor: fromMe ? "pink" : "blue",
                paddingX: "0.75rem",
                paddingY: "0.25rem",
                borderRadius: fromMe ? "10px 10px 10px 0" : "10px 10px 0 10px",
                color: "white",
                textAlign: "left",
                width: "fit-content",
                maxWidth: "18rem",
              }}
            >
              <ListItemText>{message.message}</ListItemText>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </ListItem>
  );
}
MessageItem.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender_id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
