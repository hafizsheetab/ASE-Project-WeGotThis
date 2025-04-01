import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import { useContext } from "react";
import ContextStore from "../utils/ContextStore";
import ResetPassword from "../pages/authentication/ResetPassword";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import Home from "../pages/home/Home.tsx";
import OfferCreation from "../pages/offer/OfferCreation.tsx";
import OfferEdit from "../pages/offer/OfferEdit.tsx";
import OfferView from "../pages/offer/OfferView.tsx";
import LayoutWithNavbarFooter from "../layouts/LayoutWithNavbarFooter.tsx";
import MyBookingListDisplay from "../pages/booking/BookingList.tsx";

const AppRoutes = () => {
    const { context } = useContext(ContextStore);
    return (
        <Router>
            {context.token ? (
                <Routes>
                    <Route element={<LayoutWithNavbarFooter/>}>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/offer/create" element={<OfferCreation/>}/>
                        <Route path="/offer/edit/:offerId" element={<OfferEdit/>}/>
                        <Route path="/offer/:offerId" element={<OfferView/>}/>
                        <Route path="/booking" element={<MyBookingListDisplay/>}/>
                        <Route path="*" element={<Navigate to="/home" replace={true}/>}/>
                    </Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/reset" element={<ResetPassword/>}/>
                    <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
                </Routes>
            )}
        </Router>
    );
};

export default AppRoutes;