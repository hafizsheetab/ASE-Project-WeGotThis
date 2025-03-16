import styles from './OfferForm.module.css'
import TextInputField from "./TextInputField"
import Divider from "./Divider"
import SeekerTypeSelection from "./SeekerTypeSelection"
import { DropdownField } from "./DropdownField"
import LocationTextInputField from './LocationTextInputField'

const OfferForm = () => {

  return (
    <form>
      <section>
        <h1>I'm offering:</h1>
        <SeekerTypeSelection/>
        <TextInputField label={false} placeholder="Title" footer={true} footerTxt="Enter here your title (min. 10 characters)"/>
      </section>

      <Divider/>

      <section className={styles.locationSection}>
        <LocationTextInputField inputTxt="Location" placeholder="Where does the task take place?"/>
        <TextInputField inputTxt="Estimated Duration" placeholder="How long does the task approximately take?"/>
      </section>

      <Divider/>

      <section className={styles.priceSection}>
        <TextInputField inputTxt="Price" placeholder="Service cost"/>
        <DropdownField radioItems={["Fixed", "Negotiable"]}/>
      </section>
    </form>
  )
}

export default OfferForm