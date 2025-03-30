import { useState } from "react";
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent, InputLabel } from "@mui/material";
import styles from "./TextInputField.module.css";

type DefaultDropdownFieldProps = {
    helperTxt?: string;
    labelTxt: string;
    itemsArray: string[];
    defaultItem?: string;
};

export const DefaultDropdownField: React.FC<DefaultDropdownFieldProps> = ({
                                                                labelTxt,
                                                                itemsArray,
                                                                helperTxt,
                                                                defaultItem,
                                                            }) => {
    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles.inputGroup}>
            <FormControl fullWidth sx={{minWidth: {sm: "100px", md: "200px"}}}>
                <InputLabel id={`select-label-${labelTxt}`}>{labelTxt}</InputLabel>
                <Select
                    labelId={`select-label-${labelTxt}`}
                    value={value}
                    onChange={handleChange}
                    label={labelTxt}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {itemsArray.map((item, idx) => (
                        <MenuItem value={item} key={idx}>{item}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{helperTxt}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default DefaultDropdownField;