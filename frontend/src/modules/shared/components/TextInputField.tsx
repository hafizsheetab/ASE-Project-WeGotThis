import { InputAdornment, TextField } from '@mui/material'
import styles from './TextInputField.module.css'

type TextInputFieldProps = {
    placeholder : string
    labelTxt? : string
    footerTxt? : string
    startIcon? : string | number
    endIcon? : string | number
    className? : string
    readonly? : boolean
}

const TextInputField : React.FC<TextInputFieldProps> = ({labelTxt, placeholder, footerTxt, startIcon, endIcon, className = styles.inputGroup, readonly=false}) => {
    
    return (
        <div className={className}>
            {labelTxt && <label className={styles.label}>{labelTxt}</label>}
            <TextField
                placeholder={placeholder}
                variant="outlined"
                fullWidth={true}
                helperText={footerTxt}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
                        endAdornment: <InputAdornment position='end'>{endIcon}</InputAdornment>,
                        readOnly: readonly
                    }
                }}
            />
        </div>
    )
}

export default TextInputField