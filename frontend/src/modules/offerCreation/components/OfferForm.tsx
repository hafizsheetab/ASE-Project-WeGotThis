import styles from './OfferCreation.module.css'
import TextInputField from "../../shared/components/TextInputField"
import RadioSelection from "../../shared/components/RadioSelection"
import { DropdownField } from "../../shared/components/DropdownField"
import LocationTextInputField from '../../shared/components/LocationTextInputField'
import { Divider} from '@mui/material'

type OfferFormProps = {
    initialValues?: {
        radioValue?: string;
        title?: string;
        location?: string;
        price?: string;
        priceType?: string;
    };
};

const OfferForm: React.FC<OfferFormProps> = ({initialValues}) => {
  return (
    <form>
      <section>
        <h1>I'm offering:</h1>
          <RadioSelection
              name="price"
              defaultValue={initialValues?.radioValue}
              options={[
                  {value: "Service Seeker", label: "Service Seeker"},
                  {value: "Service Provider/Volunteer", label: "Service Provider/Volunteer"},
              ]}
          />
          <TextInputField placeholder="Title" footerTxt="Enter here your title (min. 10 characters)"
                          value={initialValues?.title}/>
      </section>

      <Divider/>

        <section className={styles.locationSection}>
            <LocationTextInputField
                inputTxt="Location"
                placeholder="Where does the task take place?"
                value={initialValues?.location}
            />
            <section className={styles.priceSection}>
                <TextInputField
                    labelTxt="Price"
                    placeholder="Service cost"
                    startIcon="CHF"
                    value={initialValues?.price}
                />
                <DropdownField
                    labelTxt="Price Type"
                    itemsArray={["Fixed", "Negotiable"]}
                    defaultItem={initialValues?.priceType || "Fixed"}
                />
            </section>
        </section>
    </form>
  );
};

export default OfferForm;