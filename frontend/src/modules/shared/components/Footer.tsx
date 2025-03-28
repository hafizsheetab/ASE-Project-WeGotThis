import React from "react";
import {Box, Typography} from "@mui/material";
import {Facebook, LinkedIn, Twitter, Instagram} from "@mui/icons-material";

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                color: "black",
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 4,
                py: 1,
            }}
        >
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
                <Box>
                    <Typography variant="h6" fontWeight={700}>
                        WeGotThis
                    </Typography>

                    <Box sx={{display: "flex", gap: 2, mt: 1}}>
                        <Facebook sx={{cursor: "pointer"}}/>
                        <LinkedIn sx={{cursor: "pointer"}}/>
                        <Twitter sx={{cursor: "pointer"}}/>
                        <Instagram sx={{cursor: "pointer"}}/>
                    </Box>
                </Box>

                <Box sx={{display: "flex", gap: 3, alignItems: "center"}}>
                    <Typography variant="body2" sx={{cursor: "pointer"}}>
                        Data Privacy
                    </Typography>
                    <Typography variant="body2" sx={{cursor: "pointer"}}>
                        Support
                    </Typography>
                    <Typography variant="body2" sx={{cursor: "pointer"}}>
                        Laws
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;