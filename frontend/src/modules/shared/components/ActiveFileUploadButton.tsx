import { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import StyledButton from "./StyledButton";

type ActiveFileUploadButtonProps = {
  buttonTxt: string;
  onFileUpload: (file: File | null) => void;
  resetTrigger?: number; 
};

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const ActiveFileUploadButton: React.FC<ActiveFileUploadButtonProps> = ({ buttonTxt, onFileUpload, resetTrigger }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileUpload(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <StyledButton component="label" style={{width: "85%"}} variant='outlined' startIcon={<CloudUploadIcon />} color="secondary">
      {buttonTxt}
      <VisuallyHiddenInput key={resetTrigger} type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
    </StyledButton>
  );
};

export default ActiveFileUploadButton;
