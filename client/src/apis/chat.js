import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
export const getById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API(token).get(`/chat/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
