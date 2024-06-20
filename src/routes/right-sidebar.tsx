import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Fragment } from "react";
import { Outlet, useMatches, useOutletContext } from "react-router-dom";

const drawerWidth = 320;

export default function RightSidebar() {
  const matches = useMatches();
  const rightSidebar = matches
    // first get rid of any matches that don't have handle and rightSidebar
    .filter((match) => Boolean((match.handle as any)?.rightSidebar))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match, index) => (
      <Fragment key={index}>
        {(match.handle as any).rightSidebar(match.data)}
      </Fragment>
    ));

  return (
    <>
      <Outlet context={useOutletContext()} />
      <Drawer
        anchor="right"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
        variant="permanent"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{rightSidebar}</Box>
      </Drawer>
    </>
  );
}
