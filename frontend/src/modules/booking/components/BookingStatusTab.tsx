import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type BookingStatusTabProps = {
  onTabChange : (value : string) => void
}

const BookingStatusTab : React.FC<BookingStatusTabProps> = ({onTabChange}) =>  {
  const [value, setValue] = React.useState('requested');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
      <Tabs
        orientation='vertical'
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', paddingTop:"5em", ".MuiTabs-list": {
          justifyContent: 'space-between',
          textAlign: 'end',
          alignItems: 'end',
          height: '15em',
        }}}
      >
        <Tab  value="requested" label="Requested" {...a11yProps(0)}/>
        <Tab value="rejected" label="Rejected" {...a11yProps(1)}/>
        <Tab value="accepted" label="Accepted & Ongoing" sx={{textAlign: 'end'}}{...a11yProps(2)} />
        <Tab value="completed" label="Completed" {...a11yProps(3)}/>
      </Tabs>
  );
}

export default BookingStatusTab