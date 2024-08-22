import { Container, CssBaseline, Grid, Hidden } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MessageContainer from "../components/messages/MessageContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";
export default function Chat() {
  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Grid container spacing={0}>
            <Hidden smDown>
              <Grid item xs={0} sm={3}>
                <SidebarContainer />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={9}>
              <MessageContainer />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
