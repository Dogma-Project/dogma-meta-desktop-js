import { ThemeOptions } from "@mui/material/styles";

export const darkTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
          wordWrap: "break-word",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#0ee0b9",
    },
    secondary: {
      main: "#098c38",
    },
    background: {
      default: "#000200",
      paper: "#0b1c18",
    },
    error: {
      main: "#900f0f",
    },
    warning: {
      main: "#d28f27",
    },
    info: {
      main: "#1d8585",
    },
    success: {
      main: "#338c42",
    },
    divider: "rgba(28, 202, 137, 0.1)",
    text: {
      primary: "#d4d4d4",
    },
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeightLight: 300,
    htmlFontSize: 18,
    h1: {
      fontSize: "2.2rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.8rem",
    },
    h4: {
      fontSize: "1.6rem",
    },
    h5: {
      fontSize: "1.4rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
  },
};
