import styles from "./ResetForm.module.css";

type AuthenticationHeaderProps = {
    header : string
    text? : string 
}

const AuthenticationHeader : React.FC<AuthenticationHeaderProps> = ({header, text}) => {
  return (
    <header>
        <h1 className={styles.WeGotThislogo}>WeGotThis</h1>
        <h2 style={{margin: "1.5em 0 0", textAlign: "left"}}>{header}</h2>
        <p style={{marginTop: "0", textAlign: "left"}}>
          {text}
        </p>
      </header>
  )
}

export default AuthenticationHeader