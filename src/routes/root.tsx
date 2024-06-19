import { ThemeProvider } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router-dom";
import theme from "../theme";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab");
  const page = url.searchParams.get("page") || 1;

  let sortBy = "";

  if (tab === "popular") {
    sortBy = "popularity";
  } else if (tab === "name") {
    sortBy = "name";
  } else if (tab === "new") {
    sortBy = "latest";
  }

  return fetch(`/api/tags?page=${page}${sortBy ? `&sortBy=${sortBy}` : ""}`);
}

export default function Root() {
  const tagsResponse = useLoaderData() as any;
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
        <Outlet context={tagsResponse} />
      </Box>
    </ThemeProvider>
  );
}
