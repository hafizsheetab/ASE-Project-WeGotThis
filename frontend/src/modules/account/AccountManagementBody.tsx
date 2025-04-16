import { Avatar, Box, Divider, FormHelperText, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import styles from "../home/components/Home.module.css";
import ProfileName from '../profile/ProfileName';
import test from '../../assets/test.png'
import { deepOrange } from '@mui/material/colors';
import { UserCategory } from '../profile/Types';
import ActiveFileUploadButton from '../shared/components/ActiveFileUploadButton';
import { useContext, useEffect, useState } from 'react';
import TextInputField from '../shared/components/TextInputField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';
import { Email, Person, Preview } from '@mui/icons-material';
import CategorySelector from '../offerCreation/components/CategorySelector';
import DialogSelect from '../offerCreation/components/CategorySelectorDialog';
import CategoryList from '../shared/components/CategoryChipDisplay';
import { OfferTemplateResponse } from '../offerCreation/Types';
import { getOfferCreationTemplate } from '../offerCreation/services';
import ContextStore from '../../utils/ContextStore';
import LocationTextInputField from '../shared/components/LocationTextInputField';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActiveButton from '../shared/components/ActiveClickButton';

interface ProfileInfoDisplayTypes {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    profileImg: string,
    location : string
    password: string,
    registrationYear : string
    providedService: number
    seekedServices: number
    categoryIds: number[]
}

const userInfo : ProfileInfoDisplayTypes = {
    firstName: "Max",
    lastName: "Schmidt",
    email: "Max.schmidt@gmail.de",
    phone: "+4163217310",
    profileImg: test,
    location : "8004 Zurich, Switzerland",
    password: "rlewrkw",
    registrationYear : "2023",
    providedService: 2, //get offers from user and filter to completed and type: provided
    seekedServices: 3,
    categoryIds: [1]
}

const AccountManagementBody = () => {
    const store = useContext(ContextStore)
    const [newUserInfo, setNewUserInfo] = useState<ProfileInfoDisplayTypes>({...userInfo})
    const [passwords, setPasswords] = useState({
        newPassword: "",
        newPasswordCorrect : true,
        confirmPassword: "",
        confirmPasswordCorrect : true,
        showNewPassword: false,
        showConfirmPassword: false,
    })
    
    const handleImageUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader();

            setNewUserInfo({
                ...userInfo,
                profileImg: reader.result as string
            })

            reader.readAsDataURL(file);
        }
    };

    const [template, setTemplate] = useState<OfferTemplateResponse>({
            priceModes: [],
            offerCategories: [],
            offerTypes: []
        })
        useEffect(() => {
            (async () => {
                const response  = await getOfferCreationTemplate(store)
                if("status" in response){
                    return
                }
                setTemplate(response)
            })()
        },[])

    const addCategory = (ids: number[]) => {
        const categoryIds = structuredClone(newUserInfo.categoryIds)
        categoryIds.push(...ids)
        setNewUserInfo({...newUserInfo, categoryIds})
    }
    const removeCategory = (id: number) => {
        const categoryIds = structuredClone(newUserInfo.categoryIds)
        setNewUserInfo({...newUserInfo, categoryIds: categoryIds.filter(vId => vId !== id)})
    }
    const onChangeLocation = (value: string) => {
        setNewUserInfo({...newUserInfo, location: value})
    }
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

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        const isLengthValid = passwords.newPassword.length >= 7;
        const isMatch = passwords.newPassword === passwords.confirmPassword;

        if (!isLengthValid) {
            setPasswords({
                ...passwords,
                newPasswordCorrect: false
            });
            return;
        } else if (!isMatch){
            setPasswords({
                ...passwords,
                confirmPasswordCorrect: false
            });
            return;
        }
    }

  return (
    <form className={styles.homeContent}>
        <Typography variant="h4">Account Information:</Typography>

        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction="row"  alignItems='center' gap={2} sx={{flex:1}}>
                <Avatar 
                    sx={{ bgcolor: deepOrange,  width: 64, height: 64}}
                    alt={newUserInfo.firstName}
                    src={newUserInfo.profileImg}
                    />

                <h2>{newUserInfo.firstName} {newUserInfo.lastName}</h2>
            </Stack>
            <Box sx={{width: "20%"}}>
                <ActiveFileUploadButton
                    buttonTxt="Upload Image"
                    onFileUpload={handleImageUpload}
                />
            </Box>
        </Stack>

        <Divider/>

        <Typography variant='h6'>Personal Information</Typography>

        <Stack direction='row' justifyContent='space-between' gap={10}> 
            <TextField label="First Name" style={{flex:1}}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <PersonIcon />
                            </InputAdornment>
                        )
                    }
                
                }}
                value={newUserInfo.firstName} onChange={(e) => setNewUserInfo({...newUserInfo, firstName:e.target.value})} 
                error={newUserInfo.firstName.trim() === ""} />

            <TextField label="Last Name" style={{flex:1}}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <PersonIcon />
                            </InputAdornment>
                        )
                    }
                
                }}
                value={newUserInfo.lastName} onChange={(e) => setNewUserInfo({...newUserInfo, lastName:e.target.value})} 
                error={newUserInfo.lastName.trim() === ""} />
        </Stack>

        <Stack direction='row' justifyContent='space-between' gap={10}> 
            <TextField label="Email Address" style={{flex:1}} type='email'
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Email />
                            </InputAdornment>
                        )
                    }
                
                }}
                value={newUserInfo.email} onChange={(e) => setNewUserInfo({...newUserInfo, email:e.target.value})} 
                error={newUserInfo.email.trim() === ""} />

            <TextField label="Phone Number" style={{flex:1}} type='tel' 
                placeholder="+41 12 123 12 12"
                slotProps={{
                    input: {
                        inputProps: {
                          pattern: "\\+\\d{1,3}(\\s\\d{1,4}){2,5}"
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIphoneIcon />
                            </InputAdornment>
                          )
                    }
                  
                }}
                value={newUserInfo.phone} onChange={(e) => setNewUserInfo({...newUserInfo, phone:e.target.value})} 
                error={newUserInfo.phone.trim() === ""} />
        </Stack>


        <Stack direction='row' justifyContent='space-between' gap={10}> 
            <Box sx={{flex: 1}}>
                <LocationTextInputField
                    inputTxt="Location"
                    placeholder="Where does the task take place?"
                    value={newUserInfo?.location}
                    onSelect={onChangeLocation}
                />
                {newUserInfo.location.trim() === "" && <FormHelperText error={newUserInfo.location.trim() === ""}>Enter a location</FormHelperText>}
            </Box>

            <Box sx={{width: 100, flex:1}}/>
        </Stack>

        <Divider/>
        <CategorySelector initialValues={{template}} addCategory = {addCategory} removeCategory = {removeCategory} categoryIds={newUserInfo.categoryIds}/>
        <Divider/>
        <Typography variant='h6'>Password Management</Typography>

        <Stack direction='row' justifyContent='space-between' gap={10}> 
            <TextField label="New Password" style={{flex:1}}
                type={passwords.showNewPassword ? 'text' : 'password'}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <PersonIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label={
                                        passwords.showNewPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {passwords.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                
                }}
                value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value, newPasswordCorrect: true})} 
                error={!passwords.newPasswordCorrect}
                helperText={!passwords.newPasswordCorrect? "Password must be at least 7 characters long." : ""} />

            <TextField label="Confirm New Password" style={{flex:1}}
                type={passwords.showConfirmPassword ? 'text' : 'password'}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <PersonIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label={
                                        passwords.showConfirmPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {passwords.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                
                }}
                value={passwords.confirmPassword} onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value, confirmPasswordCorrect: true})} 
                error={!passwords.confirmPasswordCorrect}
                helperText={!passwords.confirmPasswordCorrect? "Password doesn't match." : ""} />
        </Stack>

        <ActiveButton onClick={handleSubmit} buttonTxt='Save Changes' style={{width: "20%", margin: "1em auto" }}/>


    </form>
  )
}

export default AccountManagementBody