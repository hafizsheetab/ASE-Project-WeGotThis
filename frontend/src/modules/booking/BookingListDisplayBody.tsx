import PaginationControlled from '../shared/components/PaginationControls';
import BookingList from "./BookingList";
import styles from "./Booking.module.css";
import { Box, Divider, Paper, Stack, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BookingRequestResponseBody } from "./Types";
import ContextStore from "../../utils/ContextStore";
import { getAllBookingRequest } from "./services";

const BookingListDisplayBody = () => {
  const maxNumOfItemsOnPage = 25;
  const store = useContext(ContextStore)

  const loadBookingArray = async () => {
    const _bookingArray = await getAllBookingRequest(store)
    console.log(_bookingArray)

    if("status" in _bookingArray){
      return
    }
    setBookingArray(_bookingArray)

    let _filtered = _bookingArray.filter((booking) =>
      {
        return booking.user.id === store.context.user.id && booking.status.displayValue === 'requested'
      })

    setFilteredArray(_filtered)
  }

  useEffect(() => {
    loadBookingArray()
  },[store.context.update])  

  const [bookingArray, setBookingArray] = useState<Array<BookingRequestResponseBody>>([])
  const [filteredArray, setFilteredArray] = useState<Array<BookingRequestResponseBody>>([])
  const [tabSetting, setTabSetting] = useState({
    serviceType : "my",
    statusType : 'requested'
  });

  useEffect(() => {
    filterBookings();
  }, [tabSetting.statusType, tabSetting.serviceType]);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  const filterBookings = () => {
    let filtered = bookingArray.filter(
      (booking) =>
      {
        return tabSetting.serviceType === "my" ? booking.user.id === store.context.user.id && booking.status.displayValue === tabSetting.statusType : booking.user.id !== store.context.user.id && booking.status.displayValue === tabSetting.statusType  
      }
    )
    setFilteredArray(filtered)
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
                <PaginationControlled numberOfItems={filteredArray.length} maxItemsOnOnePage={maxNumOfItemsOnPage} onPaginationClick={handlePaginationChange}/>
                <BookingList bookingsArr={filteredArray} statusType={tabSetting.statusType} serviceType={tabSetting.serviceType} loadArray={loadBookingArray}/>
              </Box>
        </Stack>
          </Box>
      </Paper>
      
    </Stack>

  )
}

export default BookingListDisplayBody

