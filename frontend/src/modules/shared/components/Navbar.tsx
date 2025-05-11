import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import PublicIcon from '@mui/icons-material/Public';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem, Divider,
    IconButton,
    Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import ContextStore from "../../../utils/ContextStore";

type MenuType = "offer" | "favorites" | "notifications" | "account" | "lang" | null;

const Navbar: React.FC = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

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

    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => navigate("/offer/create")}>
            Create Offer
        </MenuItem>
          <MenuItem onClick={() => navigate(`/offer`)}>My Offers</MenuItem>
        <MenuItem onClick={() => navigate(`/booking`)}>My Bookings</MenuItem>
        <MenuItem onClick={() => navigate(`/account`)}>My Account</MenuItem>
        <MenuItem onClick={() => navigate(`/profile`)}>My User Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
        
        </Menu>
      );

    const renderMenuItems = () => {
        const store = useContext(ContextStore)
        switch (menuType) {
            case "favorites":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>Offers</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Users</MenuItem>
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
                        <MenuItem onClick={() => navigate(`/offer`)}>My Offers</MenuItem>
                        <MenuItem onClick={() => navigate(`/booking`)}>My Bookings</MenuItem>
                        <MenuItem onClick={() => navigate(`/account`)}>My Account</MenuItem>
                        <MenuItem onClick={() => navigate(`/profile`)}>My User Profile</MenuItem>
                        <MenuItem onClick={() => {store.setContext({...store.context, token: ""})}}>Logout</MenuItem>
                    </>
                );
            case "lang":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>EN</MenuItem>
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
            <Toolbar style={{width: "90%", margin: '0 auto'}}>
                <Typography variant="h5" sx={{color: "#fff", fontWeight: 700,}}
                            onClick={() => navigate("/home")}>
                    WeGotThis
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: 2}}>
                    
                    <Button
                        onClick={() => navigate("/offer/create")}
                        startIcon={<Edit/>} 
                        color="inherit"
                        > Create Offer
                    </Button>

                    <Button
                        onClick={(e) => handleOpenMenu(e, "account")}
                        startIcon={<AccountCircle /> } 
                        color="inherit"> User
                    </Button>

                    <Divider orientation="vertical" color="white" flexItem sx={{bgcolor: "white"}}/>

                    <Button
                        onClick={(e) => handleOpenMenu(e, "lang")}
                        startIcon={<PublicIcon/>} 
                        color="inherit" >EN
                    </Button>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton 
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>

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

            {renderMobileMenu}
        </AppBar>
    );
};

export default Navbar;