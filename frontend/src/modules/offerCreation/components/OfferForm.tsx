import styles from './OfferCreation.module.css'
import TextInputField from "../../shared/components/TextInputField"
import RadioSelection from "../../shared/components/RadioSelection"
import { DropdownField } from "../../shared/components/DropdownField"
import LocationTextInputField from '../../shared/components/LocationTextInputField'
import { Divider} from '@mui/material'
import { OfferRequestBody, OfferTemplateResponse } from '../Types'

type OfferFormProps = {
    initialValues: {
        radioValue?: string;
        title?: string;
        location?: string;
        price?: string;
        priceType?: string;
        template: OfferTemplateResponse
    };
    formData: OfferRequestBody
    setFormData: React.Dispatch<React.SetStateAction<OfferRequestBody>>
};

const OfferForm: React.FC<OfferFormProps> = ({initialValues, formData, setFormData}) => {
    const onChangeRadio = (value: string) => {
        
            setFormData({...formData, typeId: Number(value)})
        
    }
    const onChangeTitle = (value: string) => {
        setFormData({...formData, title: value})
    }
    const onChangeLocation = (value: string) => {
        setFormData({...formData, location: value})
    }
    const onChangePriceMode = (value: string) => {
        const priceMode = initialValues?.template.priceModes.find(pm => pm.displayValue === value)
        if(priceMode){
            setFormData({...formData, priceModeId: priceMode.id})
        }
    }
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
              onChange={onChangeRadio}
          />
          <TextInputField placeholder="Title" footerTxt="Enter here your title (min. 10 characters)"
                          value={formData.title} onChange={(e) => {
                            onChangeTitle(e.target.value)
                          }}/>
      </section>

      <Divider/>

        <section className={styles.locationSection}>
            <LocationTextInputField
                inputTxt="Location"
                placeholder="Where does the task take place?"
                value={initialValues?.location}
                onSelect={onChangeLocation}
            />
            <section className={styles.priceSection}>
                <TextInputField
                    labelTxt="Price"
                    placeholder="Service cost"
                    startIcon="CHF"
                    value={initialValues?.price}
                    onChange={(e) => {
                        setFormData({...formData, price: Number(e.target.value)})
                    }}
                />
                <DropdownField
                    labelTxt="Price Type"
                    itemsArray={initialValues.template.priceModes.map(ot => ot.displayValue)}
                    onChange={onChangePriceMode}
                />
            </section>
        </section>
    </form>
  );
};

export default OfferForm;