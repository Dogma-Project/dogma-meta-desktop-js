import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2a524e",
    },
    secondary: {
      main: "#32d4ad",
    },
    background: {
      default: "#fdfdfd",
      paper: "#ecf3f0",
    },
    error: {
      main: "#6b1313",
    },
    warning: {
      main: "#9a6611",
    },
    info: {
      main: "#1d8585",
    },
    success: {
      main: "#338c42",
    },
    divider: "rgba(90,191,155,0.11)",
    text: {
      primary: "#232323",
    },
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeightLight: 300,
    htmlFontSize: 18,
    h1: {
      fontSize: "2.4rem",
    },
    h6: {
      fontSize: "1.3rem",
    },
  },
};
