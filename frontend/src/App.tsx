import { useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/Routes";
import { ContextData } from "./modules/shared/Types";
import ContextStore from "./utils/ContextStore";
import { ToastContainer } from "react-toastify";

function App() {

  const [context, setContext] = useState<ContextData>({
    token: "",
    expire: true,
    locale: "en"
  })
  
  return (
    <ContextStore.Provider value={{context, setContext}}>
    <div className="app-container">
      <AppRoutes />
    </div>
    <ToastContainer />
    </ContextStore.Provider>
  );
}

export default App;
