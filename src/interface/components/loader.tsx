import { useContext } from "react";
import { AppContext } from "../context";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  const { state } = useContext(AppContext);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={state.busy}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
