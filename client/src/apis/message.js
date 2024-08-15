import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
export const sendMessage = async (currChat, message) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API(token).post(`/message/send`, {
      chat_id: currChat,
      message: message,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
