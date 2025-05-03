import BookingStatusTab from "./BookingStatusTab";
import PaginationControlled from '../shared/components/PaginationControls';
import RadioSeekerType from "./SeekerTypeRadioSelection";
import BookingList from "./BookingList";
import styles from "./Booking.module.css";
import { Box, Divider, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BookingRequestResponseBody } from "./Types";
import ContextStore from "../../utils/ContextStore";
import { getAllBookingRequest } from "./services";

const BookingListDisplayBody = () => {
  const numberOfItems = 102;
  const maxNumOfItemsOnPage = 25;
  const store = useContext(ContextStore)
  const loadBookingArray = async () => {
    const _bookingArray = await getAllBookingRequest(store)
    console.log(_bookingArray)
    if("status" in _bookingArray){
      return
    }
    setBookingArray(_bookingArray)
  }
    useEffect(() => {
      loadBookingArray()
    },[store.context.update])
    const [bookingArray, setBookingArray] = useState<Array<BookingRequestResponseBody>>([])
    const [tabSetting, setTabSetting] = useState({
      serviceType : "my",
      statusType : 'requested'
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
              value={tabSetting.statusType}
              onChange={(e, val) => setTabSetting({...tabSetting, statusType: val})}
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
                <Tab value={'my'} label="My Booking Requests to Offers"/>
                <Tab value={'notmy'} label="Requests to my Offers"/>
              </Tabs>

              <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 10em)", px: 6, py: 4}}>  
                <PaginationControlled numberOfItems={numberOfItems} maxItemsOnOnePage={maxNumOfItemsOnPage} onPaginationClick={handlePaginationChange}/>
                <BookingList bookingsArr={bookingArray} statusType={tabSetting.statusType} serviceType={tabSetting.serviceType} loadArray={loadBookingArray}/>
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

