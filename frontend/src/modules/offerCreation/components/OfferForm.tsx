import styles from './OfferCreation.module.css'
import TextInputField from "../../shared/components/TextInputField"
import RadioSelection from "../../shared/components/RadioSelection"
import LocationTextInputField from '../../shared/components/LocationTextInputField'
import { Divider, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material'
import { OfferRequestBody, OfferTemplateResponse } from '../Types'
import { useState } from 'react'

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
    setError: {
        titleError: boolean,
        locationError: boolean,
        descriptionError: boolean,
    }
};

const OfferForm: React.FC<OfferFormProps> = ({initialValues, formData, setFormData, setError}) => {
    const [priceTypeChoice, setPriceTypeChoice] = useState("fixed")

    const onChangeRadio = (value: string) => {
            setFormData({...formData, typeId: Number(value)})
    }

    const onChangeTitle = (value: string) => {
        setFormData({...formData, title: value})
    }
    const onChangeLocation = (value: string) => {
        setFormData({...formData, location: value})
    }

    const handlePriceTypeChange = (event: SelectChangeEvent) => {
            onChangePriceMode(event.target.value)
            setPriceTypeChoice(event.target.value)
        };

    const onChangePriceMode = (value: string) => {
        const priceMode = initialValues?.template.priceModes.find(pm => pm.displayValue === value)
        if(priceMode){
            setFormData({...formData, priceModeId: priceMode.id})
        }
    }

    const itemsArray = initialValues.template.priceModes.map(ot => ot.displayValue)
    console.log(initialValues.radioValue)
    console.log(formData)

  return (
    <form style={{flex: 1.5}} >
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
          <TextInputField placeholder="Title" footerTxt="Enter here your title (min. 10 characters)" required
                          value={formData.title} onChange={(e) => {
                            onChangeTitle(e.target.value)
                          }} error={setError.titleError} errorMessage='Enter a title with at least 10 characters'/>
      </section>

      <Divider/>

        <section className={styles.locationSection}>
            <LocationTextInputField
                inputTxt="Location"
                placeholder="Where does the task take place?"
                value={initialValues?.location}
                onSelect={onChangeLocation}
            />
            {setError.locationError && <FormHelperText error={setError.locationError}>Enter a location</FormHelperText>}

            <section className={styles.priceSection} style={{margin: "2em 0"}}>
                <TextField
                    placeholder='0'
                    label="Service cost"
                    required
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">CHF</InputAdornment>,
                        }
                    }}
                    value={initialValues?.price}
                    onChange={(e) => {
                        setFormData({...formData, price: Number(e.target.value)})
                    }}
                />

                <FormControl sx={{minWidth: {sm: "100px", md: "200px"}}}>
                    <InputLabel>Price Type</InputLabel>
                    <Select
                        label="Price Type"
                        value={initialValues?.priceType || priceTypeChoice}
                        onChange={handlePriceTypeChange}
                    >
                        {itemsArray.map((item, idx) => (
                            <MenuItem value={item} key={idx}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


            </section>
        </section>
    </form>
  );
};

export default OfferForm;