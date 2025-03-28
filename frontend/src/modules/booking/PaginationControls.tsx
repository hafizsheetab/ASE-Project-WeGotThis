import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationControlledProps = {
  numberOfItems : number;
  maxItemsOnOnePage : number;
  onPaginationClick : (page : number) => void;
}

const PaginationControlled : React.FC<PaginationControlledProps> = ({numberOfItems, maxItemsOnOnePage, onPaginationClick}) => {
  const [page, setPage] = React.useState(1);
  const rangeStart = (page - 1) * maxItemsOnOnePage + 1;
  const rangeEnd = Math.min((page * maxItemsOnOnePage), numberOfItems);
  const limitPages = Math.ceil(numberOfItems / maxItemsOnOnePage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPaginationClick(value)
  };

  return (
    <Stack spacing={2} direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "flex-end"
      }}>
      <Typography>{rangeStart} to {rangeEnd} out of {numberOfItems} results</Typography>
      <Pagination count={limitPages} page={page} onChange={handleChange} shape="rounded" color="primary" />
    </Stack>
  );
}

export default PaginationControlled