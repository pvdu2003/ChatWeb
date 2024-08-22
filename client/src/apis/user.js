import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
// export const getById = async (id) => {
//   try {
//     const token = sessionStorage.getItem("token");
//     const response = await API(token).get(`/chat/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
export const getAll = async (user = "") => {
  try {
    const token = sessionStorage.getItem("token");
    let response;
    if (user === "" || user === undefined) {
      response = await API(token).get("/user/all");
    } else {
      response = await API(token).get(`/user/all?user=${user}`);
    }
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
