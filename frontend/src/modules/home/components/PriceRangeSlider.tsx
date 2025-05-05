import * as React from 'react';
import {
  Box,
  OutlinedInput,
  InputLabel,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Typography,
} from '@mui/material';

type PriceRangeSelectProps = {
  value: [number, number] | null;
  onChange: (value: [number, number]) => void;
  label: string;
};

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

const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({ value, onChange, label }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [localValue, setLocalValue] = React.useState<[number, number]>(value || [0, 1000]);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.SyntheticEvent<Element, Event>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChange(localValue);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setLocalValue(newValue as [number, number]);
  };

  return (
    <>
      <FormControl sx={{ m: 1, maxWidth: { xs: '175px', md: '200px' }, minWidth: { xs: '175px', md: '200px' } }}>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${label}`}
          id={`price-range-${label}`}
          value={`CHF${localValue[0]} - CHF${localValue[1]}`}
          input={<OutlinedInput label={label} />}
          onOpen={handleOpen}
          open={false}
          renderValue={() =>
            value ? `CHF${value[0]} - CHF${value[1]}` : 'Select price range'
          }
          MenuProps={MenuProps}
        >
          <MenuItem disabled>Price Range</MenuItem>
        </Select>
      </FormControl>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ px: 3, py: 2, width: 250 }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={localValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={5}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">CHF{localValue[0]}</Typography>

            {localValue[1] === 1000? (
                <Typography variant="body2">CHF{localValue[1]}+</Typography> )
                : (
                    <Typography variant="body2">CHF{localValue[1]}</Typography>
                )
            }
            
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default PriceRangeSelect;
