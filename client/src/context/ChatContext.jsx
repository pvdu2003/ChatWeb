import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const ChatContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
  const [currChat, setCurrChat] = useState();

  return (
    <ChatContext.Provider value={{ currChat, setCurrChat }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
};