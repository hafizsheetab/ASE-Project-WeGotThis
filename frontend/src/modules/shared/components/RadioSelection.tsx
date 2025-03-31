import { FC, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, FormHelperText, FormControl } from "@mui/material";

type ActiveRadioGroupProps = {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  row?: boolean;
  defaultValue?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

const ActiveRadioGroup: FC<ActiveRadioGroupProps> = ({
  name,
  options,
  row = true,
  defaultValue,
  required = false,
  onChange,
}) => {
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange && onChange(value);
    if (required) setError(!value);
    
  };

  return (
    <FormControl component="fieldset" error={error}>
      <RadioGroup
        row={row}
        aria-label={name}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio required={required} />}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
      {error && required && <FormHelperText>Please select an option.</FormHelperText>}
    </FormControl>
  );
};

export default ActiveRadioGroup;