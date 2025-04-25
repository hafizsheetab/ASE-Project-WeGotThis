import {
    Avatar,
    Box,
    Divider,
    FormHelperText,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import styles from "./AccountManagement.module.css";
import test from "../../assets/test.png";
import { deepOrange } from "@mui/material/colors";
import ActiveFileUploadButton from "../../shared/components/ActiveFileUploadButton";
import { useContext, useEffect, useState } from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PersonIcon from "@mui/icons-material/Person";
import { Email, Person, Preview } from "@mui/icons-material";
import CategorySelector from "../../offerCreation/components/CategorySelector";
import { OfferTemplateResponse } from "../../offerCreation/Types";
import { getOfferCreationTemplate } from "../../offerCreation/services";
import ContextStore from "../../../utils/ContextStore";
import LocationTextInputField from "../../shared/components/LocationTextInputField";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ActiveButton from "../../shared/components/ActiveClickButton";
import { UserResponse } from "../../shared/Types";
import { changeSelf, getSelf, uploadProfilePicture } from "../services";
import { ChangeSelfRequestBody } from "../Types";
import { useNavigate } from "react-router-dom";

interface ProfileInfoDisplayTypes {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImg: string;
    location: string;
    password: string;
    registrationYear: string;
    providedService: number;
    seekedServices: number;
    categoryIds: number[];
}

const userInfo: ProfileInfoDisplayTypes = {
    firstName: "Max",
    lastName: "Schmidt",
    email: "Max.schmidt@gmail.de",
    phone: "+4163217310",
    profileImg: test,
    location: "8004 Zurich, Switzerland",
    password: "rlewrkw",
    registrationYear: "2023",
    providedService: 2, //get offers from user and filter to completed and type: provided
    seekedServices: 3,
    categoryIds: [1],
};

const AccountManagementBody = () => {
    const nav = useNavigate()
    const store = useContext(ContextStore);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        newPasswordCorrect: true,
        confirmPassword: "",
        confirmPasswordCorrect: true,
        showNewPassword: false,
        showConfirmPassword: false,
    });

    const [user, setUser] = useState<UserResponse>({
        firstName: "",
        lastName: "",
        email: "",
        expire: true,
        id: "",
        phoneNumber: "",
        location: "",
        categories: [],
        imageUrl: "",
    });
    const [categoryIds, setCategoryIds] = useState<number[]>([]);
    useEffect(() => {
        const vcategoryIds = user.categories.map((ct) => ct.id);
        setCategoryIds(vcategoryIds);
    }, [user]);
    const handleImageUpload = async (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append("image", file, file.name);
            const response = await uploadProfilePicture(formData, store);
            console.log(response);
            if ("status" in response) {
                return;
            }
            setUser({ ...user, imageUrl: response.imageUrl });
        }
    };

    const [template, setTemplate] = useState<OfferTemplateResponse>({
        priceModes: [],
        offerCategories: [],
        offerTypes: [],
    });
    useEffect(() => {
        (async () => {
            const response = await getOfferCreationTemplate(store);
            if ("status" in response) {
                return;
            }
            setTemplate(response);
            const userResponse = await getSelf(store);
            if ("status" in userResponse) {
                return;
            }
            setUser({ ...user, ...userResponse });
        })();
    }, []);

    const addCategory = (ids: number[]) => {
        setCategoryIds([...categoryIds, ...ids]);
    };
    const removeCategory = (id: number) => {
        setCategoryIds(categoryIds.filter((vId) => vId !== id));
    };
    const onChangeLocation = (value: string) => {
        setUser({ ...user, location: value });
    };
    const handleClickShowPassword = () =>
        setPasswords((prev) => ({
            ...prev,
            showNewPassword: !prev.showNewPassword,
        }));

    const handleClickShowConfirmPassword = () =>
        setPasswords((prev) => ({
            ...prev,
            showConfirmPassword: !prev.showConfirmPassword,
        }));

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
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting")
        if (passwords.newPassword.length !== 0) {
            const isLengthValid = passwords.newPassword.length >= 7;
            const isMatch = passwords.newPassword === passwords.confirmPassword;

            if (!isLengthValid) {
                setPasswords({
                    ...passwords,
                    newPasswordCorrect: false,
                });
                return;
            } else if (!isMatch) {
                setPasswords({
                    ...passwords,
                    confirmPasswordCorrect: false,
                });
                return;
            }
        }
        const payload: ChangeSelfRequestBody = {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            location: user.location,
            expire: user.expire,
            password: passwords.newPassword,
            categoryIds,
        };
        const response = await changeSelf(payload, store);
        if ("status" in response) {
            return;
        }
        setUser(response);
        store.setContext({ ...store.context, user: response });
    };

    return (
        <form className={styles.homeContent}>
            <Typography variant="h4">Account Information:</Typography>

            <Stack
                direction={{xs: 'column', sm: 'row'}}
                justifyContent="space-between"
                alignItems={{xs: 'start', sm:'center'}}
                gap={2}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    sx={{ flex: 1 }}
                >
                    <Avatar
                        sx={{ bgcolor: deepOrange, width: 64, height: 64 }}
                        alt={user.firstName}
                        src={user.imageUrl}
                    />

                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>
                </Stack>
                <Box sx={{ width: {xs: "50%", sm: "36%", lg: "20%"} }}>
                    <ActiveFileUploadButton
                        buttonTxt="Upload Image"
                        onFileUpload={handleImageUpload}
                    />
                </Box>
            </Stack>

            <Divider />

            <Typography variant="h6">Personal Information</Typography>

            <Stack direction="row" justifyContent="space-between" gap={{xs: 2, smd: 10}}>
                <TextField
                    label="First Name"
                    style={{ flex: 1 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={user.firstName}
                    onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                    }
                    error={user.firstName.trim() === ""}
                />

                <TextField
                    label="Last Name"
                    style={{ flex: 1 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={user.lastName}
                    onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                    }
                    error={user.lastName.trim() === ""}
                />
            </Stack>

            <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" gap={{xs: 2, smd: 10}}>
                <TextField
                    label="Email Address"
                    style={{ flex: 1 }}
                    type="email"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    error={user.email.trim() === ""}
                />

                <TextField
                    label="Phone Number"
                    style={{ flex: 1 }}
                    type="tel"
                    placeholder="+41 12 123 12 12"
                    slotProps={{
                        input: {
                            inputProps: {
                                pattern: "\\+\\d{1,3}(\\s\\d{1,4}){2,5}",
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIphoneIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={user.phoneNumber}
                    onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                    }
                    error={user.phoneNumber.trim() === ""}
                />
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={{xs: 2, smd: 10}}>
                <Box sx={{ flex: 1 }}>
                    <LocationTextInputField
                        inputTxt="Location"
                        placeholder="Where does the task take place?"
                        value={user?.location}
                        onSelect={onChangeLocation}
                    />
                    {user.location.trim() === "" && (
                        <FormHelperText error={user.location.trim() === ""}>
                            Enter a location
                        </FormHelperText>
                    )}
                </Box>

                <Box sx={{ width: 100, flex: 1, display: {xs: 'none', md:'block'}}} />
            </Stack>

            <Divider />
            <CategorySelector
                initialValues={{ template }}
                addCategory={addCategory}
                removeCategory={removeCategory}
                categoryIds={categoryIds}
            />
            <Divider />
            <Typography variant="h6">Password Management</Typography>

            <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" gap={{xs: 2, smd: 10}}>
                <TextField
                    label="New Password"
                    style={{ flex: 1 }}
                    type={passwords.showNewPassword ? "text" : "password"}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            passwords.showNewPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {passwords.showNewPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={passwords.newPassword}
                    onChange={(e) =>
                        setPasswords({
                            ...passwords,
                            newPassword: e.target.value,
                            newPasswordCorrect: true,
                        })
                    }
                    error={!passwords.newPasswordCorrect}
                    helperText={
                        !passwords.newPasswordCorrect
                            ? "Password must be at least 7 characters long."
                            : ""
                    }
                />

                <TextField
                    label="Confirm New Password"
                    style={{ flex: 1 }}
                    type={passwords.showConfirmPassword ? "text" : "password"}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            passwords.showConfirmPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {passwords.showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                        setPasswords({
                            ...passwords,
                            confirmPassword: e.target.value,
                            confirmPasswordCorrect: true,
                        })
                    }
                    error={!passwords.confirmPasswordCorrect}
                    helperText={
                        !passwords.confirmPasswordCorrect
                            ? "Password doesn't match."
                            : ""
                    }
                />
            </Stack>

            <ActiveButton
                onClick={handleSubmit}
                buttonTxt="Save Changes"
                style={{margin: "1em auto" }}
            />
        </form>
    );
};

export default AccountManagementBody;
