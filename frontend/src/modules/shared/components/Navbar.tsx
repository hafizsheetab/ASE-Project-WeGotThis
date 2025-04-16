import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
    Badge,
    Button,
} from "@mui/material";
import { ArrowDropDown, Edit, FavoriteBorderOutlined } from "@mui/icons-material";

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
          <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
        </Menu>
      );

    const renderMenuItems = () => {
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
                        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                    </>
                );
            case "lang":
                return (
                    <>
                        <MenuItem onClick={handleCloseMenu}>EN</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>DE</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>FR</MenuItem>
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
                        startIcon={<IconButton
                            sx={{
                                pointerEvents: 'none', 
                                }}
                            size="large"
                            edge="end"
                            aria-label="create new offer"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            <Edit/> 
                        </IconButton>} 
                        color="inherit"
                        > Create Offer
                    </Button>

                    {/* <Button
                        onClick={(e) => handleOpenMenu(e, "favorites")}
                        startIcon={<IconButton
                            sx={{
                                pointerEvents: 'none', 
                                }}
                            size="large"
                            edge="end"
                            aria-label="favorite menu"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            <FavoriteBorderOutlined /> 
                        </IconButton>} 
                        color="inherit"
                        endIcon={<IconButton
                            sx={{
                                pointerEvents: 'none', 
                                }}
                                size="large"
                                edge="start"
                                aria-label="expand more"
                                aria-haspopup="true"
                                color="inherit"
                                >
                                <ArrowDropDown />
                            </IconButton>}
                        > Favorites
                    </Button> */}

                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        onClick={(e) => handleOpenMenu(e, "notifications")}
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Button
                        onClick={(e) => handleOpenMenu(e, "account")}
                        startIcon={<IconButton
                            sx={{
                                pointerEvents: 'none', 
                                }}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            <AccountCircle /> 
                        </IconButton>} 
                        color="inherit"> User
                    </Button>

                    <Divider orientation="vertical" color="white" flexItem sx={{bgcolor: "white"}}/>

                    <Button
                        onClick={(e) => handleOpenMenu(e, "lang")}
                        startIcon={<IconButton
                            size="large"
                            edge="end"
                            aria-label="select language"
                            aria-haspopup="true"
                            color="inherit"sx={{
                                pointerEvents: 'none', 
                                }}
                            >
                            <PublicIcon />
                        </IconButton>} 
                        endIcon={<IconButton
                            sx={{
                                pointerEvents: 'none', 
                                }}
                                size="large"
                                edge="start"
                                aria-label="expand more"
                                aria-haspopup="true"
                                color="inherit"
                                >
                                <ArrowDropDown />
                            </IconButton>}
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