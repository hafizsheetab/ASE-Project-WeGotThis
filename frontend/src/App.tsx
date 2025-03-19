import { useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/Routes";
import { ContextData } from "./modules/shared/Types";
import ContextStore from "./utils/ContextStore";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import { ClipLoader } from 'react-spinners';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary:{
      main: "#fa921a",
      light: "#ffa733",
      dark: "#b26500",
      contrastText: "#FFFFFF"
    },
    success:{
      main: "#CFF7D3",
      contrastText: "#02542D",
    }
  },
});
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function App() {

  const [context, setContext] = useState<ContextData>({
    token: "",
    expire: true,
    locale: "en",
    color: "#ffffff",
    loading: false
  })
  
  return (
    <ContextStore.Provider value={{context, setContext}}>
      <ClipLoader
        color={context.color}
        loading={context.loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ThemeProvider theme={theme}>
      <div className="app-container">
      <AppRoutes />
    </div>
    <ToastContainer />
      </ThemeProvider>
    </ContextStore.Provider>
  );
}

export default App;