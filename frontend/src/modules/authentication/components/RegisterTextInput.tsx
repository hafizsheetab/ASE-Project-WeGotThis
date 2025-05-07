import { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import TextInputField from "../../shared/components/TextInputField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { RegisterFormBody, TokenResponse } from "../Types";
import ActiveButton from "../../shared/components/ActiveClickButton";
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import ContextStore from "../../../utils/ContextStore";
import { register } from "../services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getSelf } from "../../account/services";
import AlertToast from "../../shared/components/AlertToast";
import { OpenAlert } from "../../shared/Types";

const RegisterTextInputs = () => {
    const store = useContext(ContextStore);
    const [error, setError] = useState(false);
    const [registerForm, setRegisterForm] = useState<RegisterFormBody>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isPasswordVisible: false,
        agreedToTerms: false,
    });

    const [openAlert, setOpenAlert] = useState<OpenAlert>({
            open: false,
            message: "",
            severity: "error"
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerForm.password.length < 7 || registerForm.password.length > 32) {
            setError(true);
            return;
        }

        let response = await register(
            {
                email: registerForm.email,
                password: registerForm.password,
                expire: true,
                firstName: registerForm.firstName,
                lastName: registerForm.lastName,
            },
            store
        );

        if ("status" in response && !response.status) {
            setOpenAlert({...openAlert, open: true, message: response.popupMessage})
            return;
        }

        response = response as TokenResponse;
        const userResponse = await getSelf(store, response.access_token);
        if ("status" in userResponse) {
            setOpenAlert({...openAlert, open: true, message: userResponse.popupMessage})
            return;
        }
        
        store.setContext({ ...store.context, token: response.access_token, user: userResponse });
    };

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
            <Stack
                direction={{ xs: "column", smd: "row" }}
                gap={{ xs: 0, smd: 2 }}
            >
                <TextInputField
                    placeholder="Enter your first name"
                    labelTxt="First Name:"
                    required
                    type="text"
                    value={registerForm.firstName}
                    onChange={(e) =>
                        setRegisterForm({
                            ...registerForm,
                            firstName: e.target.value,
                        })
                    }
                />
                <TextInputField
                    placeholder="Enter your last name"
                    labelTxt="Last Name:"
                    required
                    type="text"
                    value={registerForm.lastName}
                    onChange={(e) =>
                        setRegisterForm({
                            ...registerForm,
                            lastName: e.target.value,
                        })
                    }
                />
            </Stack>

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
                value={registerForm.email}
                onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                }
            />

            <TextInputField
                placeholder="Enter your password"
                labelTxt="Password:"
                endIcon={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                registerForm.isPasswordVisible
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={() =>
                                setRegisterForm({
                                    ...registerForm,
                                    isPasswordVisible:
                                        !registerForm.isPasswordVisible,
                                })
                            }
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {registerForm.isPasswordVisible ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                type={registerForm.isPasswordVisible ? "text" : "password"}
                required
                value={registerForm.password}
                onChange={(e) =>
                    setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                    })
                }
                error={error}
                errorMessage="Password must be at least 7 and max. 32 characters long."
            />

            <FormControlLabel
                style={{ margin: "0.5em 0 .3em" }}
                required
                control={
                    <Checkbox
                        size="small"
                        checked={registerForm.agreedToTerms}
                        onChange={() =>
                            setRegisterForm({
                                ...registerForm,
                                agreedToTerms: !registerForm.agreedToTerms,
                            })
                        }
                    />
                }
                label={
                    <Typography variant="caption" style={{ cursor: "default" }}>
                        By checking this box, you are agreeing to our &nbsp;
                        <Link
                            component="button"
                            underline="hover"
                            variant="caption"
                        >
                            terms of service
                        </Link>
                        .
                    </Typography>
                }
            />

            <ActiveButton
                type="submit"
                buttonTxt="Register"
                style={{ width: "100%", padding: ".75em 0" }}
            />

            <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
        </form>
    );
};

export default RegisterTextInputs;
