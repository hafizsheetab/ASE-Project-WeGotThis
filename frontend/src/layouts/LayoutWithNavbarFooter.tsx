import {Outlet} from "react-router-dom";
import Navbar from "../modules/shared/components/Navbar";
import Footer from "../modules/shared/components/Footer";
import { Box } from "@mui/material";

const LayoutWithNavbarFooter = () => {
    return (
        <>
            <Navbar/>
            <Box sx={{minHeight:"calc(85vh)"}}>
                <Outlet/>
            </Box>
            <Footer/>
        </>
    );
};

export default LayoutWithNavbarFooter;