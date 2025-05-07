import * as React from 'react';
import { Menu, MenuItem, FormControl, Select, InputLabel, Typography, Box, OutlinedInput } from '@mui/material';
import DateTimeRange from '../../offerCreation/components/DateTimeRange';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimeRangeSelectProps } from '../Types';

const DateTimeRangeSelect: React.FC<DateTimeRangeSelectProps> = ({ value, onChange, label }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [localValue, setLocalValue] = React.useState<[Dayjs, Dayjs]>(
    value ? [dayjs.unix(value[0]), dayjs.unix(value[1])] : [dayjs(), dayjs()]
  );

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.SyntheticEvent<Element, Event>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (localValue[0] && localValue[1]) {
      onChange([localValue[0].unix(), localValue[1].unix()]);
    }
  };

  const handleDateChange = (startTime: number, endTime: number) => {
    const newStart = dayjs.unix(startTime);
    const newEnd = dayjs.unix(endTime);
    setLocalValue([newStart, newEnd]);
  };

  return (
    <>
      <FormControl sx={{ m: 1, maxWidth: { xs: '175px', md: '200px' }, minWidth: { xs: '175px', md: '200px' } }}>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel> 
        <Select
          labelId={`select-label-${label}`}
          id={`date-range-select-${label}`}
          input={<OutlinedInput label={label} />}
          value={localValue ? `${localValue[0]?.format('DD/MM/YYYY')} - ${localValue[1]?.format('DD/MM/YYYY')}` : ''}
          onOpen={handleOpen}
          open={false}
          renderValue={() =>
            localValue[0] && localValue[1]
              ? `${localValue[0]?.format('DD/MM/YYYY')} - ${localValue[1]?.format('DD/MM/YYYY')}`
              : 'Select date range'
          }
        >
          {localValue && (
          <MenuItem
              value={`${localValue[0].format('DD/MM/YYYY')} - ${localValue[1].format('DD/MM/YYYY')}`}
              sx={{ display: 'none' }}
            >
              {`${localValue[0].format('DD/MM/YYYY')} - ${localValue[1].format('DD/MM/YYYY')}`}
          </MenuItem>
          )}
          <MenuItem disabled>Select Date Range</MenuItem>
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
        <Box sx={{ px: 3, py: 2, width: "auto" }}>
          <Typography gutterBottom>Date Range</Typography>
          <DateTimeRange initialStartTime={localValue[0]} initialEndTime={localValue[1]} setTime={handleDateChange} />
        </Box>
      </Menu>
    </>
  );
};

export default DateTimeRangeSelect;
