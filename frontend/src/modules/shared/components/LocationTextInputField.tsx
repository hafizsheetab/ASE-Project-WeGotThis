import { GeoapifyContext, GeoapifyGeocoderAutocomplete} from "@geoapify/react-geocoder-autocomplete";
import styles from "./TextInputField.module.css";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { InputLabel } from "@mui/material";


type TextInputFieldProps = {
  label?: boolean;
  inputTxt?: string;
  placeholder? : string;
  footer?: boolean;
  footerTxt?: string;
  value?: string;
  onSelect?: (location: string) => void
};

const LocationTextInputField: React.FC<TextInputFieldProps> = ({
  inputTxt,
  label = true,
  footer = false,
  placeholder = "Enter address here",
  footerTxt,
  onSelect,
  value = "",
}) => {
  const API_KEY = "3f77cd19690242aa94338bc6405e52d7"; 

  const onPlaceSelect = (value : GeoJSON.Feature) => {
    if (onSelect) {
      onSelect(value.properties?.formatted);
    }
    console.log(value);
  }

  function onSuggectionChange(value : GeoJSON.Feature[]) {
    console.log(value);
  }

  return (
    <div className={`${styles.inputGroup} ${styles.geoapifyWrapper}`}>
      {label && <InputLabel>{inputTxt}</InputLabel>}

      <GeoapifyContext className={styles.geoapifyWrapper} apiKey={API_KEY}>
        <GeoapifyGeocoderAutocomplete placeholder={placeholder}
            placeSelect={onPlaceSelect}
            suggestionsChange={onSuggectionChange}
                                      value={value}
        />
        </GeoapifyContext>

      {footer && <p className={styles.footerTxt}>{footerTxt}</p>}
    </div>
  );
};

export default LocationTextInputField;