import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import ForgotPwd from "./pages/ForgotPwd.jsx";
import ChangePwd from "./pages/ChangePwd.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import CreateChat from "./pages/CreateChat.jsx";
import ManageChat from "./pages/ManageChat.jsx";
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Chat /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/change-pwd"
          element={authUser ? <ChangePwd /> : <Login />}
        />
        <Route path="/create" element={authUser ? <CreateChat /> : <Login />} />
        <Route
          path="/manage/:id"
          element={authUser ? <ManageChat /> : <Login />}
        />
        <Route path="/forgot-pwd" element={<ForgotPwd />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
