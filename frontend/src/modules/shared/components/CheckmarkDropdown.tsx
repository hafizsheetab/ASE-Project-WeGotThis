import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type CheckmarkDropdownProps = {
  itemArray: string[];
  label: string;
  onChange: (selectedValues: string[]) => void;
};

const CheckmarkDropdown: React.FC<CheckmarkDropdownProps> = ({ itemArray, label, onChange }) => {
  const [value, setValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;

    const newValue = typeof value === 'string' ? value.split(',') : value;
    setValue(newValue);

    onChange(newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, maxWidth: { xs: '175px', md: '200px' }, minWidth: { xs: '175px', md: '200px' } }}>
        <InputLabel id={`select-label-${label}`} sx={{ color: '#000' }}>
          {label}
        </InputLabel>
        <Select
          labelId={`select-label-${label}`}
          id={`dropdown-${label}`}
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {itemArray.map((item) => (
            <MenuItem key={item + "-" + itemArray.indexOf(item)} value={item}>
              <Checkbox checked={value.includes(item)} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckmarkDropdown;
