import styles from './TextInputField.module.css'

type TextInputFieldProps = {
    placeholder : string
    label? : boolean
    inputTxt? : string
    footer? : boolean
    footerTxt? : string
}
const TextInputField : React.FC<TextInputFieldProps> = ({inputTxt, placeholder, label=true, footer=false, footerTxt}) => {
    
    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.label}>{inputTxt}</label>}
            <input 
                className={styles.input}
                type="text"
                placeholder={placeholder}
            />

            {footer && <p className={styles.footerTxt}>{footerTxt}</p>}
        </div>
    )
}

export default TextInputField