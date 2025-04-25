import { Box } from "@mui/material";
import sidebarImg from "./SidebarDraft.png"

const Sidebar = () => {
    return (
        <Box sx={{flex: "1", display: {xs: 'none', lg: 'block'}}}>
            <img src={sidebarImg} alt="Sidebar Image" style={{width:"100%", height:"100%"}} />
        </Box>
    );
};

export default Sidebar;
