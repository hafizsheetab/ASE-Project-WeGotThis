import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem, Divider,
} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(() => ({
    minHeight: "127px",
    display: "flex",
    justifyContent: "space-between",
}));

type MenuType = "offer" | "favorites" | "notifications" | "account" | " lang" | null;

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<MenuType>(null);
    const navigate = useNavigate();
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, type: MenuType) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuType(null);
    };

    const renderMenuItems = () => {
        switch (menuType) {
            case "offer":
                return (
                    <>
                        <MenuItem onClick={() => navigate("/offer/create")}>Service Providing Offer</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Service Seeking Offer</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Users</MenuItem>
                    </>
                );
            case "favorites":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>Favorite 1</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Favorite 2</MenuItem>
                    </>
                );
            case "notifications":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>Notification 1</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Notification 2</MenuItem>
                    </>
                );
            case "account":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>My Offers</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>My Bookings</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>My User Profile</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                    </>
                );
            case "lang":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>English</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>German</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>French</MenuItem>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#6B63EB",
            }}
        >
            <StyledToolbar>
                <Typography variant="h5" sx={{color: "#fff", fontWeight: 700,}}
                            onClick={() => navigate("/home")}>
                    WeGotThis
                </Typography>

                <Box sx={{display: "flex", alignItems: "center", gap: 4}}>
                    <Typography
                        sx={{color: "#fff", cursor: "pointer", fontWeight: 700}}
                        onClick={(e) => handleOpenMenu(e, "offer")}
                    >
                        + Create Offer
                    </Typography>

                    <Typography
                        sx={{color: "#fff", cursor: "pointer", fontWeight: 700}}
                        onClick={(e) => handleOpenMenu(e, "favorites")}
                    >
                        &lt;3 Favorites
                    </Typography>

                    <Typography
                        sx={{color: "#fff", cursor: "pointer", fontWeight: 700}}
                        onClick={(e) => handleOpenMenu(e, "notifications")}
                    >
                        O Notifications
                    </Typography>

                    <Typography
                        sx={{color: "#fff", cursor: "pointer", fontWeight: 700}}
                        onClick={(e) => handleOpenMenu(e, "account")}
                    >
                        My Account
                    </Typography>
                    <Divider orientation="vertical" color="white" flexItem sx={{bgcolor: "white"}}/>
                    <Typography
                        sx={{color: "#fff", cursor: "pointer", fontWeight: 700}}
                        onClick={(e) => handleOpenMenu(e, "lang")}
                    >
                        en
                    </Typography>
                </Box>
            </StyledToolbar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                sx={{
                    "& .MuiPaper-root": {
                        mt: 1,
                        width: "233px",
                        boxShadow: "0px 2px 15px rgba(198, 198, 198, 0.25)",
                        borderRadius: "8px",
                    },
                }}
            >
                {renderMenuItems()}
            </Menu>
        </AppBar>
    );
};

export default Navbar;