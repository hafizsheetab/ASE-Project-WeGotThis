import { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import TextInputField from "../../shared/components/TextInputField";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ActiveButton from "../../shared/components/ActiveClickButton";
import { InputAdornment } from "@mui/material";
import { checkForError } from "../../shared/services";
import { forgotPassword, } from "../services";
import ContextStore from "../../../utils/ContextStore";

const ForgotPasswordTextInputs = () => {
    const store = useContext(ContextStore);
    const  [email, setEmail] = useState<string>("")
    const [success, setSuccess] = useState(false)

    const handleForgotPassword = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await forgotPassword({email: email}, store)
        if(checkForError(response)){
            return
        }
        setSuccess(true)
        // After successful login, navigate to /home
        // navigate("/home");
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


      </form>
  )
}

export default ForgotPasswordTextInputs