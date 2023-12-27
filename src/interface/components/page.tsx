import SetPrefix from "./set-prefix";
import ServicesManager from "./services-manager";
import { useContext } from "react";
import { AppContext } from "../context/app-context";
import { ApiProvider } from "../context/api-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darkTheme } from "../themes/dark";

function Page() {
  const {
    state: { prefix },
  } = useContext(AppContext);

  const theme = createTheme(darkTheme);

  return (
    <ApiProvider prefix={prefix}>
      <ThemeProvider theme={theme}>
        {!prefix ? (
          <SetPrefix></SetPrefix>
        ) : (
          <ServicesManager></ServicesManager>
        )}
      </ThemeProvider>
    </ApiProvider>
  );
}

export default Page;
