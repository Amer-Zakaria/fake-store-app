import "./App.css";
import Products from "./Components/Products";
import customTheme from "./Components/styles/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import ProductsProvider from "./Providers/ProductsProvider";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <ProductsProvider>
          <div className="App">
            <Products />
          </div>
        </ProductsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
