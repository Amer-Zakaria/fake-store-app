import "./App.css";
import Products from "./Components/Products";
import customTheme from "./Components/styles/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <div className="App">
          <Products />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
