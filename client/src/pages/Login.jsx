import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser, oathGoogle } from "../apis/auth";
import { useAuthContext } from "../context/AuthContext";
function Login() {
  const defaultTheme = createTheme();

  const defaultData = {
    username: "",
    password: "",
  };
  const { authUser, setAuthUser } = useAuthContext();
  const [formData, setFormData] = useState(defaultData);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const resp = await loginUser(username, password);

    if (resp.message) {
      toast.error(resp.message);
    } else {
      sessionStorage.setItem("user", JSON.stringify(resp));
      sessionStorage.setItem("token", resp.token);
      toast.success("Login successfully!!!", { autoClose: 1000 });
      setTimeout(() => {
        setAuthUser(resp);
      }, 1500);
    }
  };
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/auth/google/redirect`,
      "_self"
    );
  };

  useEffect(() => {
    const oauthGoogle = async () => {
      try {
        const responseData = await oathGoogle();
        if (responseData.user) {
          sessionStorage.setItem("user", JSON.stringify(responseData.user));
          sessionStorage.setItem("token", responseData.token);
          setAuthUser(responseData.user);
        }
      } catch (error) {
        console.error("Error fetching Google OAuth data:", error);
      }
    };

    oauthGoogle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={googleAuth}
              >
                Login with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
