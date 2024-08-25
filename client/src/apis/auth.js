import axios from "axios";
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
export const oathGoogle = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/auth/google/success`,
      {
        withCredentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error when logging in using google");
  }
};
