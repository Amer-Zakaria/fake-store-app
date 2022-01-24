import "./App.css";
import Products from "./Components/Products";
import customTheme from "./Components/styles/theme";
import { ThemeProvider } from "@mui/material";
import ProductsProvider from "./Providers/ProductsProvider";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ProductsProvider>
        <div className="App">
          <Products />
        </div>
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;
