import {Outlet} from "react-router-dom";
import Navbar from "../modules/shared/components/Navbar";
import Footer from "../modules/shared/components/Footer";

const LayoutWithNavbarFooter = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default LayoutWithNavbarFooter;