import { createTheme } from "@mui/material";

const customTheme = createTheme({
  typography: {
    fontFamily: "'Lato', Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#9c27b0",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 510,
      md: 690,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          margin: "20px 15px",
          padding: "20px 10px 10px",
          borderRadius: "20px",
          position: "relative",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: "all 0.3s",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0 !important",
          margin: "5px 0px",
          overflowWrap: "break-word;",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          display: "block",
          padding: "0",
        },
      },
    },
  },
});

export default customTheme;
