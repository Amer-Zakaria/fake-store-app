import "./App.css";
import Product from "./Components/Product";
import customTheme from "./Components/styles/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ margin: 10 }} className="App">
        <Product />
      </div>
    </ThemeProvider>
  );
}

export default App;
