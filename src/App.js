import "./App.css";
import customTheme from "./Components/styles/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";

import Home from "./Components/Home";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <div className="App">
          <Home />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
