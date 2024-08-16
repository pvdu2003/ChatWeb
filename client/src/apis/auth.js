import axios from "axios";

const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: { Authorization: token },
  });
// eslint-disable-next-line no-undef
const api = import.meta.env.VITE_SERVER_URL;
export const loginUser = async (username, password) => {
  try {
    const resp = await axios.post(
      `${api}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    const data = await resp.data;
    return data;
  } catch (error) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } else {
      console.error(error);
    }
  }
};
export const signupUser = async (
  username,
  email,
  password,
  gender,
  full_name,
  confirm_password
) => {
  try {
    return await axios.post(`${api}/auth/signup`, {
      username,
      email,
      password,
      gender,
      full_name,
      confirm_password,
    });
  } catch (error) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } else {
      console.error(error);
    }
  }
};
export const validUser = async () => {
  try {
    const token = sessionStorage.getItem("token");

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log("error in valid user api");
  }
};
