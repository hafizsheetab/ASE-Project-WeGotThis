import { ReactNode } from "react";
import StyledButton from "./StyledButton";

type ActiveButtonProps = {
  buttonTxt: string;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
};

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
