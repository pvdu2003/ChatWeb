import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAll } from "../../../apis/chat";
import ConversationItem from "./ConversationItem";
import { useSocketContext } from "../../../context/SocketContext";

export default function ConversationList() {
  const { socket } = useSocketContext();

  const [list, setList] = useState([]);
  const fetchAllChat = async () => {
    try {
      const data = await getAll();
      setList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllChat();
    if (socket) {
      socket.on("receiveMessage", fetchAllChat);
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage", fetchAllChat);
      }
    };
  }, [socket]);
  return (
    <Box
      sx={{
        overflow: "auto",
        maxHeight: "90vh",
        width: "100%",
        mt: 1,
      }}
    >
      {list.length > 0 ? (
        <>
          {Object.values(list).map((item, index) => (
            <ConversationItem key={index} {...item} />
          ))}
        </>
      ) : (
        <p>No Conversation before</p>
      )}
    </Box>
  );
}
