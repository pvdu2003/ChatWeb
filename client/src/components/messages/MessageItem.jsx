import PropTypes from "prop-types";

import { Grid, Box, ListItem, ListItemText } from "@mui/material";

export default function MessageItem({ index, message }) {
  return (
    <ListItem key={index} sx={{ padding: [0, 0.2] }}>
      <Grid
        container
        justifyContent={index % 5 === 0 ? "flex-start" : "flex-end"}
      >
        <Grid
          item
          container
          justifyContent={index % 5 === 0 ? "flex-start" : "flex-end"}
        >
          <Box
            sx={{
              backgroundColor: index % 5 === 0 ? "pink" : "blue",
              paddingX: "0.75rem",
              paddingY: "0.25rem",
              borderRadius:
                index % 5 === 0 ? "10px 10px 10px 0" : "10px 10px 0 10px",
              color: "white",
              textAlign: "left",
              width: "fit-content",
              maxWidth: 400,
            }}
          >
            <ListItemText>{message}</ListItemText>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}
MessageItem.propTypes = {
  message: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
