import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type BookingStatusTabProps = {
  onTabChange : (value : string) => void
}

const BookingStatusTab : React.FC<BookingStatusTabProps> = ({onTabChange}) =>  {
  const [value, setValue] = React.useState('requested');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        variant="fullWidth"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="requested" label="Requested" />
        <Tab value="rejected" label="Rejected" />
        <Tab value="accepted" label="Accepted & Ongoing" />
        <Tab value="completed" label="Completed" />
      </Tabs>
    </Box>
  );
}

export default BookingStatusTab