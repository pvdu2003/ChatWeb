import axios from "axios";

export default function Chat() {
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`);
      // Remove the token from local storage or cookie
      localStorage.removeItem("token");
      // Redirect the user to the login page or the home page
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
