import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MainRouter from "./routes"
import './App.css'
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
