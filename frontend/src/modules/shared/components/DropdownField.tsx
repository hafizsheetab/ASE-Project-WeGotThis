import { useState } from "react";
import inputStyles from '../../shared/components/TextInputField.module.css'
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent } from "@mui/material";

type DropdownFieldProps = {
    helperTxt? : string
    labelTxt? : string
    itemsArray : string[]
    defaultItem? : string
}

export const DropdownField : React.FC<DropdownFieldProps> = ({labelTxt, itemsArray, helperTxt, defaultItem}) => {
  const [value, setValue] = useState(defaultItem);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div className={inputStyles.inputGroup}>
      {labelTxt && <label className={inputStyles.label}>{labelTxt}</label>}

      <FormControl sx={{minWidth: 120 }}>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >

          {itemsArray.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperTxt}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default DropdownField;
