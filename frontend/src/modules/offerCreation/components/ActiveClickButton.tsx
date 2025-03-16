import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

type ActiveButtonProps = {
  buttonTxt: string;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
};

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "10px 20px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));

const ActiveButton: React.FC<ActiveButtonProps> = ({ 
  buttonTxt, 
  variant = "contained", 
  color = "secondary", 
  startIcon, 
  endIcon, 
  onClick 
}) => {
  return (
    <StyledButton 
      variant={variant} 
      color={color} 
      startIcon={startIcon} 
      endIcon={endIcon} 
      onClick={onClick}
    >
      {buttonTxt}
    </StyledButton>
  );
};

export default ActiveButton;
