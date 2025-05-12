import { useContext, useEffect, useState } from "react";
import styles from "./Authentication.module.css";
import TextInputField from "../../shared/components/TextInputField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ActiveButton from "../../shared/components/ActiveClickButton";
import { IconButton, InputAdornment } from "@mui/material";
import ContextStore from "../../../utils/ContextStore";
import { useNavigate } from "react-router-dom"; 
import { LoginFormBody, TokenResponse } from "../Types";
import { login } from "../services";
import AlertToast from "../../shared/components/AlertToast";
import { getSelf } from "../../account/services";


const LoginTextInputs = () => {
    const navigate = useNavigate(); 
    const store = useContext(ContextStore);
    const [loginForm, setLoginForm] = useState<LoginFormBody>({
        email: "",
        password: "",
        isPasswordVisible: false,
    });

    const [loginError, setLoginError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoginError(null);
        let response = await login({email: loginForm.email, password: loginForm.password, expire: true}, store)

        if("status" in response && !response.status){
            setLoginError(response.popupMessage); 
            setOpenSnackbar(true); 
            return
        }

        response = response as TokenResponse;
        const userResponse = await getSelf(store, response.access_token);
        
        if ("status" in userResponse) {
            setLoginError(userResponse.popupMessage)
            return;
        }
        
        store.setContext({ ...store.context, token: response.access_token, user: userResponse });
    };

    const handleForgotPassword = () => {
        navigate("/forgotPassword");
    };

    useEffect(() => {
        if (store.context.token) {
            navigate("/home");
        }
    }, [navigate, store.context.token]);

    const handleClickShowPassword = () =>
        setLoginForm({
            ...loginForm,
            isPasswordVisible: !loginForm.isPasswordVisible,
        });

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
        <form onSubmit={handleLogin} className={styles.form}>
            <TextInputField
                placeholder="Enter your email"
                labelTxt="Email:"
                endIcon={
                    <InputAdornment position="end">
                        <MailOutlineIcon />
                    </InputAdornment>
                }
                required
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                    setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                    })
                }
            />


        <AlertToast text={loginError} open={openSnackbar} severity='error' handleClose={() => {
                setOpenSnackbar(false)
            }}/>
            <TextInputField
                placeholder="Enter your password"
                labelTxt="Password"
                extraLink="Forgot Password?"
                extraLinkOnClick={handleForgotPassword}
                endIcon={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                loginForm.isPasswordVisible
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {loginForm.isPasswordVisible ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                required={true}
                type={loginForm.isPasswordVisible ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) =>
                    setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                    })
                }
                errorMessage="Password doesn't match."
            />
            <ActiveButton
                type="submit"
                buttonTxt="Login"
                style={{ width: "100%", padding: ".75em 0", marginTop: "2em" }}
            />
        </form>
    );
};

export default LoginTextInputs;
