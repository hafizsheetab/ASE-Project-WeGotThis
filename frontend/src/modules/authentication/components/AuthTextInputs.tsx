import { useState } from "react";
import styles from "./ResetForm.module.css";
import TextInputField from "../../shared/components/TextInputField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActiveButton from "../../shared/components/ActiveClickButton";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";

const AuthTextInputs = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({ newPassword: false, confirmPassword: false });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const isLengthValid = newPassword.length >= 7;
        const isMatch = newPassword === confirmPassword;

        if (!isLengthValid) {
            setError({
                newPassword: !isLengthValid,
                confirmPassword: false,
            });
            return;
        } else if (!isMatch){
            setError({
                newPassword: false,
                confirmPassword: !isMatch,
            })
            return;
        }

        navigate("/login");
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <TextInputField 
            placeholder="Enter your new Password" 
            labelTxt="New Password:"
            endIcon={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
              }
            required={true}
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={error.newPassword}
            errorMessage="Password must be at least 7 characters long."
            />
        <TextInputField
            placeholder="Confirm your new Password"
            labelTxt="Confirm New Password:"
            endIcon={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showConfirmPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
              }
            required={true}
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error.confirmPassword}
            errorMessage="Password doesn't match."
        />
        <ActiveButton
            onClick={handleSubmit}
            buttonTxt="Reset Password"
            style={{ width: "100%", padding: ".75em 0", marginTop: "1em" }}
        />
      </form>
  )
}

export default AuthTextInputs