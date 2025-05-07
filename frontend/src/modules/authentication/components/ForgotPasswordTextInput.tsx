import { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import TextInputField from "../../shared/components/TextInputField";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ActiveButton from "../../shared/components/ActiveClickButton";
import { InputAdornment } from "@mui/material";
import { forgotPassword, } from "../services";
import ContextStore from "../../../utils/ContextStore";
import { OpenAlert } from "../../shared/Types";
import AlertToast from "../../shared/components/AlertToast";

const ForgotPasswordTextInputs = () => {
    const store = useContext(ContextStore);
    const  [email, setEmail] = useState<string>("")
    const [openAlert, setOpenAlert] = useState<OpenAlert>({
            open: false,
            message: "",
            severity: "error"
        });


    const handleForgotPassword = async(e: React.FormEvent) => {
        e.preventDefault();

        const response = await forgotPassword({email: email}, store)

        if("status" in response && !response.status){
            setOpenAlert({open: true, message: response.popupMessage, severity: "error"})
            return
        }

        setOpenAlert({open: true, message: "You will soon receive an email to reset your password.", severity: 'success'})
    };

  return (
    <form onSubmit={handleForgotPassword} className={styles.form}>
        <TextInputField 
            placeholder="Enter your email" 
            labelTxt="Email:"
            endIcon={
                <InputAdornment position="end">
                    <MailOutlineIcon/>
                </InputAdornment>
              }
            required
            type='email'
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            />
        
        <ActiveButton
            type="submit"
            buttonTxt="Send Email"
            style={{ width: "100%", padding: ".75em 0", marginTop: "2em" }}
        />

        <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
        }}/>


      </form>
  )
}

export default ForgotPasswordTextInputs