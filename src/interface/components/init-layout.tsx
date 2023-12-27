import AppHeader from "./header";

import CreateUser from "./modules/create-user";
import CreateNode from "./modules/create-node";
import CreateSettings from "./modules/create-settings";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function InitLayout({ stage }: { stage: number }) {
  return (
    <Box>
      <AppHeader></AppHeader>
      <Toolbar></Toolbar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {stage === 1 ? (
          <CreateUser></CreateUser>
        ) : stage === 2 ? (
          <CreateNode></CreateNode>
        ) : stage === 3 ? (
          <CreateSettings></CreateSettings>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default InitLayout;
