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
import { checkForError } from "../../shared/services";
import { useNavigate } from "react-router-dom";
import ContextStore from "../../../utils/ContextStore";
import { register } from "../services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getSelf } from "../../account/services";

const RegisterTextInputs = () => {
    const store = useContext(ContextStore);
    const navigate = useNavigate(); // Initialize navigate function
    const [error, setError] = useState(false);
    const [registerForm, setRegisterForm] = useState<RegisterFormBody>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isPasswordVisible: false,
        agreedToTerms: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerForm.password.length < 7) {
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
        if (checkForError(response)) {
            return;
        }
        response = response as TokenResponse;
        const userResponse = await getSelf(store, response.access_token);
        if ("status" in userResponse) {
            return;
        }
        
        store.setContext({ ...store.context, token: response.access_token, user: userResponse });
        // Form submission logic
        console.log("Form submitted");
        // navigate("/login"); // Redirect to login page after registration
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
                errorMessage="Password must be at least 7 characters long."
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
        </form>
    );
};

export default RegisterTextInputs;
