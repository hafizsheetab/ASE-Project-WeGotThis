import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type DialogSelectProps = {
  initialSelected?: string[];
  onSelect?: (selected: string[]) => void;
};

export default function DialogSelect({
                                       initialSelected = [],
                                       onSelect,
                                     }: DialogSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: {value},
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setSelected(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      if (onSelect) {
        onSelect(selected);
      }
    }
  };

  return (
      <div>
        <Button onClick={handleClickOpen}>Add more</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Select Category</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
              <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="dialog-multiple-category-label">Category</InputLabel>
                <Select
                    labelId="dialog-multiple-category-label"
                    id="dialog-multiple-category"
                    multiple
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category"/>}
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Walking">Walking</MenuItem>
                  <MenuItem value="Cleaning">Cleaning</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}