import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Checkbox, IconButton, Menu, MenuItem, MenuList, Rating } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterState } from '../Types';

type PaginationControlledProps = {
  numberOfItems : number;
  maxItemsOnOnePage : number;
  onPaginationClick : (page : number) => void;
  handleSelectAll?: (newFilter : FilterState) => void;
  handleFilterChange?: (newFilter: FilterState) => void;
  header? : string;
}

const PaginationControlled : React.FC<PaginationControlledProps> = ({numberOfItems, maxItemsOnOnePage, header, onPaginationClick, handleSelectAll, handleFilterChange}) => {
  const ratings = [5, 4, 3, 2, 1];
  const [page, setPage] = React.useState(1);
  const rangeEnd = Math.min((page * maxItemsOnOnePage), numberOfItems);
  const rangeStart = (page - 1) * maxItemsOnOnePage + 1;
  const limitPages = Math.ceil(numberOfItems / maxItemsOnOnePage);

  const [filter, setFilter] = React.useState({
      active: false,
      values: [] as number[],
      allSelected: true
    })

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPaginationClick(value)
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectAll = () => {
    setFilter((prev) => {
      const updatedFilter: FilterState = {
        ...prev,
        values: [],
        allSelected: !prev.allSelected,
      };
  
      handleSelectAll?.(updatedFilter);
      return updatedFilter;
    });
  
    handleClose();
  };

  const filterChange = (value: number)=>{
    setFilter((prev) => {
      const isSelected = prev.values.includes(value);
      const newValue = isSelected ? prev.values.filter((v) => v !== value) : [...prev.values, value]; 
      const allSelected = ratings.every((r) => newValue.includes(r));

      const updatedFilter: FilterState = {
        ...prev,
        values: allSelected ? [] : newValue,
        allSelected: allSelected,
      };
  
      handleFilterChange?.(updatedFilter);
  
      return updatedFilter;
    });

    handleClose();
  }

  return (
    <Stack spacing={2} direction="row" sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-cent",
        my: 2
      }}>

      <Box>
        {header && <Typography>{header}</Typography>}
        <Typography variant='subtitle2' color='textSecondary'>{Math.min(rangeStart, rangeEnd)} to {rangeEnd} out of {numberOfItems} results</Typography>
      </Box>

      <Stack direction='row' alignItems='center'>
        { handleSelectAll &&  handleFilterChange &&
          <>
            <IconButton  color={filter.active? 'primary' : 'default'} aria-label="filter-ratings"
              onClick={handleClick}>
              <FilterAltIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >

              <MenuList dense>
              <MenuItem onClick={!filter.allSelected? selectAll : undefined}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography>Select All</Typography>
                  <Checkbox checked={filter.allSelected} disabled={filter.allSelected} />
                </Stack>
              </MenuItem>

              {ratings.map((rating) => (
                <MenuItem key={rating} onClick={() => filterChange(rating)}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <Rating name={`read-only-${rating}`} value={rating} readOnly size="small" />
                    <Checkbox
                      checked={!filter.allSelected && filter.values.includes(rating)}
                      onChange={(e) => filterChange(rating)}
                    />
                  </Stack>
                </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </>
        }
        
        <Pagination count={limitPages} page={page} onChange={handleChange} shape="rounded" color="primary" />
      </Stack>
    </Stack>
  );
}

export default PaginationControlled