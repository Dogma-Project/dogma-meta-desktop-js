import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import AppHeader from "./header";
import LeftMenu from "./left-menu";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display="flex" sx={{ width: "100%" }}>
      <Box
        component="nav"
        sx={{
          width: `300px`,
          flexShrink: 1,
          display: { xs: "none", md: "block" },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              width: "300px",
            },
          }}
        >
          <LeftMenu drawerState={setMobileOpen}></LeftMenu>
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          PaperProps={{
            sx: {
              width: "300px",
              boxSizing: "border-box",
            },
          }}
          sx={{
            width: "300px",
          }}
          open
        >
          <LeftMenu></LeftMenu>
        </Drawer>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppHeader handleDrawerToggle={handleDrawerToggle}></AppHeader>
        <Box component="main" sx={{ p: 2 }}>
          <Card>
            <CardContent>
              <RouterProvider router={router} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
