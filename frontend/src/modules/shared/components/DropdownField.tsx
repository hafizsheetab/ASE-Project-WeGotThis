import { useState } from "react";
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent, InputLabel } from "@mui/material";
import inputStyles from '../../shared/components/TextInputField.module.css';
import styles from "./TextInputField.module.css";

type DropdownFieldProps = {
    helperTxt?: string;
    labelTxt?: string;
    itemsArray: string[];
    defaultItem?: string;
    onChange?: (x: string) => void
};

export const DropdownField: React.FC<DropdownFieldProps> = ({
                                                                labelTxt,
                                                                itemsArray,
                                                                helperTxt,
                                                                defaultItem,
                                                                onChange
                                                            }) => {
    const [value, setValue] = useState(defaultItem);

    const handleChange = (event: SelectChangeEvent) => {
        onChange && onChange(event.target.value)
        setValue(event.target.value);
    };

    return (
        <div className={styles.inputGroup}>
            {labelTxt && <InputLabel className={inputStyles.label}>{labelTxt}</InputLabel>}
            <FormControl sx={{minWidth: {sm: "100px", md: "200px"}}}>
                <Select
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    {itemsArray.map((item, idx) => (
                        <MenuItem value={item} key={idx}>{item}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{helperTxt}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default DropdownField;