import Box from "@mui/material/Box";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function MessageContainer() {
  const messages = [
    "Hi b oirej biajo bjareo bajr bajr ",
    "John Dvafvajbajrfb",
    "Hello",
    "Hi",
    "Johnbabab ji reijb obajiorob",
    "Hello",
    "Hi",
    "John jibaer bajer brjao bjb oirej biajo bjareo bajr bajr bojar ojbaro ebjao ba",
    "Hello",
    "Hi",
    "Johnb oirej biajo bjareo bajr bajr ",
    "Hello",
    "Hi",
    "John",
    "Hello",
    "Hi b oirej biajo bjareo bajr bajr b oirej biajo bjareo bajr bajr ",
    "John",
    "Hello",
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <MessageList messages={messages} />
      <MessageInput />
    </Box>
  );
}
