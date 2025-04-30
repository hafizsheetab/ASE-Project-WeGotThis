import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/Routes";
import { ContextData, UserResponse } from "./modules/shared/Types";
import ContextStore from "./utils/ContextStore";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, LinearProgress } from "@mui/material"; // 🛠 Import LinearProgress
import { getSelf } from "./modules/account/services";

const theme = createTheme({
  palette: {
    primary: { main: "#6B63EB", contrastText: "#fff" },
    secondary: { main: "#f97316", light: "#fa921a", contrastText: "#fff" },
    success: { main: "#CFF7D3", contrastText: "#02542D" },
    text: { primary: "#1f2937", secondary: "#6b7280" },
    background: { default: "#ffffff", paper: "#f9fafb" },
    error: { main: "#B00020" }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    button: { textTransform: "none", fontWeight: 600 }
  },
  shape: { borderRadius: 8 },
  breakpoints: {
    values: { xs: 0, sm: 600, smd: 700, md: 900, lg: 1200, xl: 1536 }
  }
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    smd: true;
  }
}

function App() {
  const [update, setUpdate] = useState(0);
  const [context, setContext] = useState<ContextData>({
    token: "",
    expire: true,
    locale: "en",
    color: "#ffffff",
    loading: false,
    user: {} as UserResponse,
  })

  return (
    <ContextStore.Provider value={{ context, setContext }}>
      {context.loading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}>
          <LinearProgress color="secondary" />
        </Box>
      )}

      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "100%",
            width: "100vw",
            mx: "auto",
            px: 0,
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
