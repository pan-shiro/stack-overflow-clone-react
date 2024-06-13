import { ThemeProvider } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import theme from "../theme";

export async function loader() {
  return fetch("/api/tags");
}

export default function Root() {
  const { tags } = useLoaderData() as any;
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography
              component="div"
              noWrap
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
              variant="h6"
            >
              Stack Overflow Clone
            </Typography>
          </Toolbar>
        </AppBar>
        <Outlet context={tags} />
      </Box>
    </ThemeProvider>
  );
}
