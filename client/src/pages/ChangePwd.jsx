import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePwd } from "../apis/auth";

export default function SignUp() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const defaultData = {
    password: "",
    confirm_password: "",
  };
  const [formData, setFormData] = useState(defaultData);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirm_password = data.get("confirm_password");
    const resp = await changePwd(password, confirm_password);

    if (resp.status === 200) {
      toast.success(resp.data.message, { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(resp.message, { autoClose: 2000 });
      setTimeout(() => {
        setFormData(defaultData);
      }, 2000);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginY: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/chat" variant="body2">
                  Comeback chat page
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
