import { createTheme } from "@mui/material";

import { adaptV4Theme } from "@mui/material/styles";

const customTheme = createTheme(
  adaptV4Theme({
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
  })
);

export default customTheme;
