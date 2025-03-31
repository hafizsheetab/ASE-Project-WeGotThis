import { ReactNode } from "react";
import StyledButton from "./StyledButton";

type ActiveButtonProps = {
  buttonTxt: string;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.FormEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size? : "small" | "medium" | "large";
};

const ActiveButton: React.FC<ActiveButtonProps> = ({ 
  buttonTxt, 

  className = "", 
  variant = "contained", 
  color = "secondary", 
  style,
  startIcon, 
  endIcon, 
  onClick, 
  disabled = false, 
  type = "button", 
  size = "medium"
}) => {
  return (
    <StyledButton 
      className={`${className}`} 
      style={style}
      size={size}
      variant={variant} 
      color={color} 
      startIcon={startIcon} 
      endIcon={endIcon} 
      onClick={onClick}

      disabled={disabled} 
      type={type} 

    >
      {buttonTxt}
    </StyledButton>
  );
};

export default ActiveButton;
