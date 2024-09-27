import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
export const sendMessage = async (currChat, message) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).post(`/message/send`, {
      id: currChat,
      message: message,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteMessage = async (messageId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).delete(`/message/${messageId}`);
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
};
