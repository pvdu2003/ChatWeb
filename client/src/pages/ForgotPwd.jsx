import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { resetPwd } from "../apis/auth";

function ForgotPwd() {
  const defaultTheme = createTheme();
  const nagigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please enter your email address", { autoClose: 2000 });
      return;
    }
    const resp = await resetPwd(email);

    if (resp.status === 200) {
      toast.success(resp.data.message, { autoClose: 1500 });
      setTimeout(() => {
        nagigate("/login");
      }, 2000);
    } else {
      toast.error(resp.data.message, { autoClose: 2000 });
      setEmail("");
    }
  };

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
              Forgot Password
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
                id="email"
                label="Your Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleOnChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 2 }}
                onSubmit={handleSubmit}
              >
                Submit
              </Button>

              <Grid container direction="column" m={0.25}>
                <Grid>
                  <Link href="/login" variant="body2">
                    Return login page?
                  </Link>
                </Grid>
                <Grid>
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

export default ForgotPwd;
