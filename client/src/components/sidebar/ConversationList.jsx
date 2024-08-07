import PropTypes from "prop-types";
import { Box } from "@mui/material";

import ConversationItem from "./ConversationItem";

export default function ConversationList({ list }) {
  return (
    <Box
      sx={{
        overflow: "auto",
        maxHeight: "90vh",
        width: "100%",
        mt: 1,
      }}
    >
      {Object.values(list).map((item, index) => (
        <ConversationItem key={index} {...item} />
      ))}
    </Box>
  );
}
ConversationList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastMessage: PropTypes.string.isRequired,
    })
  ).isRequired,
};
