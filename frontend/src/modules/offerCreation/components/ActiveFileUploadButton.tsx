import { useRef, forwardRef, useImperativeHandle } from "react";
import styles from "./Button.module.css";

type ActiveButtonProps = {
  buttonTxt: string;
  onFileUpload: (file: File | null) => void;
};

const ActiveFileUploadButton = forwardRef(({ buttonTxt, onFileUpload }: ActiveButtonProps, ref) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    triggerUpload: () => {
      fileInputRef.current?.click();
    }
  }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileUpload(file);
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.uploadButton} onClick={() => fileInputRef.current?.click()}>
        {buttonTxt}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
});

// Add display name for debugging
ActiveFileUploadButton.displayName = "ActiveFileUploadButton";

export default ActiveFileUploadButton;
