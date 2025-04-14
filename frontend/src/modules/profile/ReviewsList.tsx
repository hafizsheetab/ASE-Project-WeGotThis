import { Box, Checkbox, IconButton, Menu, MenuItem, MenuList, Pagination, Rating, Stack, Typography } from "@mui/material"
import { useState } from "react";
import { Reviews } from "./Types";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReviewCards from "./ReviewCards";

type ReviewsListProps = {
  array : Array<Reviews>
  profileImg: string
}

const ReviewsList: React.FC<ReviewsListProps> = ({array, profileImg}) => {
  const ratings = [5, 4, 3, 2, 1];
  const numberOfItems = array.length;
  const maxItemsOnOnePage = 6;
  const [page, setPage] = useState(1);
  const rangeStart = (page - 1) * maxItemsOnOnePage + 1;
  const rangeEnd = Math.min((page * maxItemsOnOnePage), numberOfItems);
  const limitPages = Math.ceil(numberOfItems / maxItemsOnOnePage);

  const [filter, setFilter] = useState({
    active: false,
    values: [] as number[],
    allSelected: true
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
  };

  const handleSelectAll = () => {
    setFilter((prev) => {
 
      return {
        ...prev,
        values: [],
        allSelected: !prev.allSelected,
      };
    });
    handleClose();
  };

  const handleFilterChange = (event: React.ChangeEvent<unknown>, value: number)=>{
    setFilter((prev) => {
      const isSelected = prev.values.includes(value);
      const newValue = isSelected ? prev.values.filter((v) => v !== value) : [...prev.values, value]; 
      console.log(isSelected)
      console.log(newValue)

      const allSelected = ratings.every((r) => newValue.includes(r));
      console.log(allSelected)

      return {
        ...prev,
        values: allSelected ? [] : newValue,
        allSelected: allSelected,
      };
    });

    console.log(filter.values)
    handleClose();
  }

  return (
    <Stack gap={4} sx={{mt:5}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography>Latest Reviews</Typography>
            <Typography variant='subtitle2' color='textSecondary'>{rangeStart} to {rangeEnd} out of {numberOfItems} results</Typography>
          </Box>

          <Stack direction='row' alignItems='center'>
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
                {/* Select All Item */}
              <MenuItem onClick={!filter.allSelected? handleSelectAll : undefined}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography>Select All</Typography>
                  <Checkbox checked={filter.allSelected} disabled={filter.allSelected} />
                </Stack>
              </MenuItem>

              {ratings.map((rating) => (
                <MenuItem key={rating} onClick={handleClose}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <Rating name={`read-only-${rating}`} value={rating} readOnly size="small" />
                    <Checkbox
                      checked={!filter.allSelected && filter.values.includes(rating)}
                      onChange={(e) => handleFilterChange(e, rating)}
                    />
                  </Stack>
                </MenuItem>
              ))}
              </MenuList>
            </Menu>

            <Pagination count={limitPages} page={page} onChange={handlePagination} shape="rounded" color="primary" />
          </Stack>
        </Stack>
        
        <Stack gap={4}>
          {filter.allSelected ? (
            array.map((item) => (
              <ReviewCards key={`${item.date}-${item.user}`} review={item} profileImg={profileImg} />
            ))
          ) : (
            (() => {
              const filteredArray = array.filter((item) =>
                filter.values.includes(Math.round(item.rating))
              );

              return filteredArray.length > 0 ? (
                filteredArray.map((item) => (
                  <ReviewCards key={`${item.date}-${item.user}`} review={item} profileImg={profileImg} />
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{ py: 15, textAlign: "center", width: "100%" }}
                  color="text.secondary"
                >
                  No matching reviews.
                </Typography>
              );
            })()
          )}
        </Stack>

    </Stack>


  )
}

export default ReviewsList