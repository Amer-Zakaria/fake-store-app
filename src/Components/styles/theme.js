import { createTheme } from "@mui/material";

const customTheme = createTheme({
  typography: {
    fontFamily: "'Lato', Arial, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: 200,
          margin: "20px auto",
          padding: "20px 10px 10px",
          borderRadius: "20px",
          position: "relative",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          opacity: 0,
          transition: "all 0.5s",
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
