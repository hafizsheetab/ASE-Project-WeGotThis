import { useState } from "react";
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent } from "@mui/material";
import inputStyles from '../../shared/components/TextInputField.module.css';
import styles from "./TextInputField.module.css";

type DropdownFieldProps = {
    helperTxt?: string;
    labelTxt?: string;
    itemsArray: string[];
    defaultItem?: string;
};

export const DropdownField: React.FC<DropdownFieldProps> = ({
                                                                labelTxt,
                                                                itemsArray,
                                                                helperTxt,
                                                                defaultItem,
                                                            }) => {
    const [value, setValue] = useState(defaultItem);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles.inputGroup}>
            {labelTxt && <label className={inputStyles.label}>{labelTxt}</label>}
            <FormControl sx={{minWidth: 120}}>
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