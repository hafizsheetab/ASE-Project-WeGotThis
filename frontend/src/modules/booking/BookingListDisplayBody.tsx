import BookingStatusTab from "./BookingStatusTab";
import PaginationControlled from '../shared/components/PaginationControls';
import RadioSeekerType from "./SeekerTypeRadioSelection";
import BookingList from "./BookingList";
import styles from "./Booking.module.css";
import { Box, Divider, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

const BookingListDisplayBody = () => {
  const numberOfItems = 102;
  const maxNumOfItemsOnPage = 25;

    const [tabSetting, setTabSetting] = useState({
      serviceType : "seeking",
      bookingType : 'requested'
    });
  
    function a11yProps(index: number) {
      return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
      };
    }
  

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  return (
    <Stack className={styles.bookingContent} spacing={3}>
      <Paper sx={{ flexGrow: 1, display: 'flex'}}>
          <Tabs
              orientation='vertical'
              variant="scrollable"
              value={tabSetting.bookingType}
              onChange={(e, val) => setTabSetting({...tabSetting, bookingType: val})}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', paddingTop:"9em", ".MuiTabs-list": {
                justifyContent: 'space-between',
                textAlign: 'end',
                alignItems: 'end',
                height: '15em',
              }}}
            >
              <Tab  value={'requested'} label="Requested" {...a11yProps(0)}/>
              <Tab value={'rejected'} label="Rejected" {...a11yProps(1)}/>
              <Tab value={'accepted'} label="Accepted & Ongoing" sx={{textAlign: 'end'}}{...a11yProps(2)} />
              <Tab value={'completed'} label="Completed" {...a11yProps(3)}/>
          </Tabs>

          <Box sx={{width: "100%", py: 2}}>
          <h2 style={{padding: "0 0 0 1em", margin: ".5em 0 0 0 "}}>My Bookings as a:</h2>
          <Stack divider={<Divider orientation="horizontal" flexItem />} sx={{width: "100%", py: 2}}>
              <Tabs
                orientation='horizontal'
                centered
                variant="fullWidth"
                value={tabSetting.serviceType}
                onChange={(e, val) => setTabSetting({...tabSetting, serviceType: val})}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab value={'seeking'} label="Service Seeker"/>
                <Tab value={'providing'} label="Service Provider"/>
              </Tabs>

              <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 10em)", px: 6, py: 4}}>  
                <PaginationControlled numberOfItems={numberOfItems} maxItemsOnOnePage={maxNumOfItemsOnPage} onPaginationClick={handlePaginationChange}/>
                <BookingList bookingsArr={bookingArr} bookingType={tabSetting.bookingType} serviceType={tabSetting.serviceType}/>
              </Box>
        </Stack>
          </Box>
      </Paper>
{/* 
      <div style={{margin: "3em 0 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
          <RadioSeekerType onChangeTrigger={handleServiceTypeChange} />
          <Typography variant='subtitle2' color='textSecondary'>{1} to {2} out of {numberOfItems} results</Typography>
        </div>

      <div style={{margin: "3em 0 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
        <RadioSeekerType onChangeTrigger={handleServiceTypeChange} />
        <Typography variant='subtitle2' color='textSecondary'>{1} to {2} out of {numberOfItems} results</Typography>
      </div>

      <Paper sx={{ flexGrow: 1, display: 'flex'}}>
        <BookingStatusTab onTabChange={handleTabChange}/>
        <BookingList bookingsArr={bookingArr}/>
      </Paper>

      <BookingList bookingsArr={bookingArr}/> */}
      
    </Stack>

  )
}

export default BookingListDisplayBody

const bookingArr = [
  { id : "1",
    title : "Walking Cute Dog",
    requestedOn : "12 February 2025",
    type : "seeking",
    availability : "24 February 2025",
    location : "Seestrasse 23, 8035 Zurich",
    originalPrice : 4, 
    priceMode : 1,
    newPrice : 8,
    offerId : "123",
    createdUserId : "11",
    requestedUserId : "23",
    bookingType: "requested"},
  { id : "2",
    title : "Do my homework ",
    requestedOn : "12 February 2025",
    type : "seeking",
    availability : "24 February 2025",
    location : "Seestrasse 23, 8035 Zurich",
    originalPrice : 4, 
    priceMode : 1,
    newPrice : 8,
    offerId : "1234",
    createdUserId : "11",
    requestedUserId : "23",bookingType: "requested"},
  { id : "3",
    title : "I do your homework ",
    requestedOn : "12 February 2025",
    type : "providing",
    availability : "24 February 2025",
    location : "Seestrasse 23, 8035 Zurich",
    originalPrice : 4, 
    priceMode : 2,
    newPrice : 8,
    offerId : "1235",
    createdUserId : "11",
    requestedUserId : "23",bookingType: "completed"},
    { id : "4",
      title : "I do your homework ",
      requestedOn : "12 February 2025",
      type : "providing",
      availability : "24 February 2025",
      location : "Seestrasse 23, 8035 Zurich",
      originalPrice : 4, 
      priceMode : 2,
      newPrice : 8,
      offerId : "1236",
      createdUserId : "11",
      requestedUserId : "23",bookingType: "review"},
      { id : "5",
        title : "I do your homework ",
        requestedOn : "12 February 2025",
        type : "providing",
        availability : "24 February 2025",
        location : "Seestrasse 23, 8035 Zurich",
        originalPrice : 4, 
        priceMode : 2,
        newPrice : 8,
        offerId : "1237",
        createdUserId : "11",
        requestedUserId : "23",bookingType: "accepted"},
        { id : "6",
          title : "I do your homework ",
          requestedOn : "12 February 2025",
          type : "providing",
          availability : "24 February 2025",
          location : "Seestrasse 23, 8035 Zurich",
          originalPrice : 4, 
          priceMode : 2,
          newPrice : 8,
          offerId : "1238",
          createdUserId : "11",
          requestedUserId : "23",bookingType: "rejected"}
]