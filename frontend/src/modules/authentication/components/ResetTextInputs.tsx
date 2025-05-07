import { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import TextInputField from "../../shared/components/TextInputField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ActiveButton from "../../shared/components/ActiveClickButton";
import { useSearchParams } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { resetPassword } from "../services";
import ContextStore from "../../../utils/ContextStore";
import { TokenResponse } from "../Types";
import { getSelf } from "../../account/services";
import AlertToast from "../../shared/components/AlertToast";
import { OpenAlert } from "../../shared/Types";

const ResetTextInputs = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({
        newPassword: false,
        confirmPassword: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const store = useContext(ContextStore);

    const [openAlert, setOpenAlert] = useState<OpenAlert>({
                open: false,
                message: "",
                severity: "error"
            });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const isLengthValid = (newPassword.length >= 7 && newPassword.length<= 32);
        const isMatch = newPassword === confirmPassword;

        if (!isLengthValid) {
            setError({
                newPassword: !isLengthValid,
                confirmPassword: false,
            });
            return;
        } else if (!isMatch) {
            setError({
                newPassword: false,
                confirmPassword: !isMatch,
            });
            return;
        }
        const token = searchParams.get("token");

        if (token === null) {
            setOpenAlert({message: "Invalid Token", severity: "error", open: true});
            return;
        }

        let response = await resetPassword(
            { password: newPassword, expire: true },
            token,
            store
        );

        if ("status" in response && !response.status) {
            setOpenAlert({message: response.popupMessage, severity: "error", open: true});
            return;
        }

        response = response as TokenResponse;
        const userResponse = await getSelf(store, response.access_token);

        if ("status" in userResponse) {
            setOpenAlert({message: userResponse.popupMessage, severity: "error", open: true});
            return;
        }

        store.setContext({ ...store.context, token: response.access_token, user: userResponse });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
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
                                showPassword
                                    ? "hide the password"
                                    : "display the password"
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
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={error.newPassword}
                errorMessage="Password must be at least 7 and max 32 characters long."
            />
            <TextInputField
                placeholder="Confirm your new Password"
                labelTxt="Confirm New Password:"
                endIcon={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showConfirmPassword
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showConfirmPassword ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                required={true}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error.confirmPassword}
                errorMessage="Password doesn't match."
            />
            <ActiveButton
                onClick={handleSubmit}
                buttonTxt="Reset Password"
                style={{ width: "100%", padding: ".75em 0", marginTop: "2em" }}
            />

            <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
        </form>
    );
};

export default ResetTextInputs;
