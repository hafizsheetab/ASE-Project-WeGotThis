import { useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/Routes";
import { ContextData } from "./modules/shared/Types";
import ContextStore from "./utils/ContextStore";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ClipLoader } from 'react-spinners';
import {Box} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6B63EB",
            contrastText: "#fff"
        },
        secondary: {
            main: "#f97316",
            light: "#fa921a",
            contrastText: "#fff"
        },
        success: {
            main: "#CFF7D3",
            contrastText: "#02542D"
        },
        text: {
            primary: "#1f2937",
            secondary: "#6b7280"
        },
        background: {
            default: "#ffffff",
            paper: "#f9fafb",
        },
        error: {
            main: "#B00020"
        }
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        button: {
            textTransform: "none",
            fontWeight: 600
        }
    },
    shape: {
        borderRadius: 8
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
          <Box
              sx={{
                  maxWidth: "1280px",
                  mx: "auto",
                  px: {xs: 2, sm: 3},
              }}
          >
      <AppRoutes />
          </Box>
    <ToastContainer />
      </ThemeProvider>
    </ContextStore.Provider>
  );
}

export default App;