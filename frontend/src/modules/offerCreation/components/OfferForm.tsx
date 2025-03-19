import styles from './OfferCreation.module.css'
import TextInputField from "../../shared/components/TextInputField"
import RadioSelection from "../../shared/components/RadioSelection"
import { DropdownField } from "../../shared/components/DropdownField"
import LocationTextInputField from '../../shared/components/LocationTextInputField'
import { Divider} from '@mui/material'
const OfferForm = () => {

  return (
    <form>
      <section>
        <h1>I'm offering:</h1>
        <RadioSelection name='price' options={[
          { value: "Service Seeker", label: "Service Seeker" },
          { value: "Service Provider/Volunteer", label: "Service Provider/Volunteer" },
        ]} />
        <TextInputField placeholder="Title" footerTxt="Enter here your title (min. 10 characters)"/>
      </section>

      <Divider/>

      <section className={styles.locationSection}>
        <LocationTextInputField inputTxt="Location" placeholder="Where does the task take place?"/>
        <section className={styles.priceSection}>
          <TextInputField labelTxt="Price" placeholder="Service cost" startIcon="CHF"/>
          <DropdownField itemsArray={["Fixed", "Negotiable"]} defaultItem='Fixed' labelTxt='Price Type:'/>
        </section>
      </section>
    </form>
  )
}

export default OfferForm