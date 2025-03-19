import { InputAdornment, TextField } from '@mui/material'
import styles from './TextInputField.module.css'

import { ReactNode } from 'react'


type TextInputFieldProps = {
    placeholder : string
    labelTxt? : string
    footerTxt? : string

    startIcon? : string | number | ReactNode
    endIcon? : string | number | ReactNode
    readonly? : boolean
    type? : string
    required? : boolean
    value? : string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error? : boolean
    errorMessage? : string
}

const TextInputField: React.FC<TextInputFieldProps> = ({
    type,
    labelTxt,
    placeholder,
    footerTxt,
    startIcon,
    endIcon,
    readonly = false,
    required = false,
    value,
    error = false,
    errorMessage,
    onChange
}) => {
    
    return (
        <div className={styles.inputGroup}>

            {labelTxt && <label className={styles.label}>{labelTxt}</label>}
            <TextField
                placeholder={placeholder}
                variant="outlined"
                fullWidth={true}
                helperText={error ? errorMessage : footerTxt}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                error={error}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
                        endAdornment: <InputAdornment position='end'>{endIcon}</InputAdornment>,
                        readOnly: readonly,
                    }
                }}
            />
        </div>
    )
}

export default TextInputField