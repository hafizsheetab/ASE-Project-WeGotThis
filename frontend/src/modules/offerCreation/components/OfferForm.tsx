import styles from './OfferCreation.module.css'
import TextInputField from "../../shared/components/TextInputField"
import RadioSelection from "../../shared/components/RadioSelection"
import { DropdownField } from "../../shared/components/DropdownField"
import LocationTextInputField from '../../shared/components/LocationTextInputField'
import { Divider} from '@mui/material'
import { OfferTemplateResponse } from '../Types'

type OfferFormProps = {
    initialValues: {
        radioValue?: string;
        title?: string;
        location?: string;
        price?: string;
        priceType?: string;
        template: OfferTemplateResponse
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
              options={initialValues.template.offerTypes.map(otype => {
                
                    return {value: String(otype.id), label: otype.displayValue}
   
                
              })}
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
                    itemsArray={initialValues.template.priceModes.map(ot => ot.displayValue)}
                    defaultItem={initialValues.template.priceModes[0].displayValue}
                />
            </section>
        </section>
    </form>
  );
};

export default OfferForm;