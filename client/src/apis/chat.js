import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
export const getById = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).get(`/chat/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAll = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).get("/chat/all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const createGroupChat = async (recipientIds) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).post("/chat/create", {
      recipientIds,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateGroupChat = async (recipientIds, id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await API(token).patch(`/chat/update/${id}`, {
      users: recipientIds,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
