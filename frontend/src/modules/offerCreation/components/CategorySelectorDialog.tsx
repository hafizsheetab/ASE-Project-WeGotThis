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
import { OfferTemplateResponse } from '../Types';

type DialogSelectProps = {
  initialSelected?: string[];
  onSelect?: (selected: string[]) => void;
  addCategory: (x : number[]) => void
    removeCategory: (x : number) => void
    categoryIds: number[]
    template?: OfferTemplateResponse
};

export default function DialogSelect({
                                       initialSelected = [],
                                       onSelect,
                                       addCategory,
                                       removeCategory,
                                       categoryIds, template
                                     }: DialogSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(initialSelected);                                  
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: {value},
    } = event;
    console.log(value)
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setSelected(newValue);
  };
  React.useEffect(() => {
    
  },[selected])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setSelected([])
      if (onSelect) {
        onSelect(selected);
      }
    }
  };
  const handleCloseSave = () => {
    const ids = new Array<number>()
    selected.map(sl => {
      const offerCategory = template?.offerCategories.find(oct => oct.displayValue === sl)
      if(offerCategory){
        ids.push(offerCategory.id)
      }
    })
    addCategory(ids)
    setSelected([])
    setOpen(false);
  }
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
                  {template?.offerCategories.map(oct => {
                    if(!categoryIds.find(cid => oct.id ===  cid)){
                      return <MenuItem id={String(oct.id)} value={oct.displayValue}>{oct.displayValue}</MenuItem>
                    }
                  })}
                 
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCloseSave}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}