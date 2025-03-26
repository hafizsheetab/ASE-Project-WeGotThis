import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));


export default StyledButton;

