import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "../pages/authentication/Login";
import OfferCreation from "../pages/offerCreation/OfferCreation";
import Register from "../pages/authentication/Register";
import Home from "../pages/Home";
import { useContext } from "react";
import ContextStore from "../utils/ContextStore";
// import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";
import ForgotPassword from "../pages/authentication/ForgotPassword";

const AppRoutes = () => {
    const { context } = useContext(ContextStore);
    return (
        <Router>
            {context.token ? (
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="*"
                        element={<Navigate to="/home" replace={true} />}
                    />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/reset" element={<ResetPassword/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace={true} />}
                    />
                </Routes>
            )}
        </Router>
    );
};

export default AppRoutes;
