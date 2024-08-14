import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
function App() {
  const { authUser } = useAuthContext();
  return (
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
    </Routes>
  );
}

export default App;
