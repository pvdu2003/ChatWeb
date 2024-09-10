import axios from "axios";
// eslint-disable-next-line no-undef
const api = import.meta.env.VITE_SERVER_URL;
const API = (token) =>
  axios.create({
    // eslint-disable-next-line no-undef
    baseURL: api,
    headers: { Authorization: `Bearer ${token}` },
  });
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
export const resetPwd = async (email) => {
  try {
    const resp = await axios.post(`${api}/auth/forgot-password`, {
      email,
    });
    const data = { data: resp.data, status: resp.status };
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
export const changePwd = async (password, confirm_password) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await API(token).post(`${api}/auth/change-password`, {
      password,
      confirm_password,
    });

    return { data: resp.data, status: resp.status };
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
export const logout = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await API(token).post(`${api}/auth/logout`);

    return { data: resp.data, status: resp.status };
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
