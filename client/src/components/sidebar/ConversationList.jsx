import PropTypes from "prop-types";

import ConversationItem from "./ConversationItem";

export default function ConversationList({ list }) {
  return (
    <>
      {Object.values(list).map((item, index) => (
        <ConversationItem key={index} {...item} />
      ))}
    </>
  );
}
ConversationList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lastMessage: PropTypes.string.isRequired,
    })
  ).isRequired,
};
