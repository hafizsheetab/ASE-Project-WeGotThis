import BookingStatusTab from "./BookingStatusTab";
import PaginationControlled from './PaginationControls';
import RadioSeekerType from "./SeekerTypeRadioSelection";
import BookingList from "./BookingList";

const BookingListDisplayBody = () => {
  const numberOfItems = 102;
  const maxNumOfItemsOnPage = 25;

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  const handleServiceTypeChange = (type : string) => {
    console.log(`Service Type has changed to ${type}`)
  }

  const handleTabChange = (tabVal : string) => {
    console.log(`Tab has changed to ${tabVal}`)
  }

  const bookingArr = [
    { id : "1",
      title : "Walking Cute Dog",
      requestedOn : "12 February 2025",
      type : "seeking",
      availability : "24 February 2025",
      location : "Seestrasse 23, 8035 Zurich",
      originalPrice : 4, 
      currency : "CHF",
      newPrice : 8,
      offerId : "123",
      createdUserId : "11",
      requestedUserId : "23",},
    { id : "2",
      title : "Do my homework ",
      requestedOn : "12 February 2025",
      type : "seeking",
      availability : "24 February 2025",
      location : "Seestrasse 23, 8035 Zurich",
      originalPrice : 4, 
      currency : "CHF",
      newPrice : 8,
      offerId : "123",
      createdUserId : "11",
      requestedUserId : "23",},
    { id : "2",
      title : "I do your homework ",
      requestedOn : "12 February 2025",
      type : "providing",
      availability : "24 February 2025",
      location : "Seestrasse 23, 8035 Zurich",
      originalPrice : 4, 
      currency : "CHF",
      newPrice : 8,
      offerId : "123",
      createdUserId : "11",
      requestedUserId : "23",}
  ]

  return (
    <section>
      <h1>My Bookings</h1>

      <BookingStatusTab onTabChange={handleTabChange}/>

      <div style={{margin: "3em 0"}}>
        <PaginationControlled onPaginationClick={handlePaginationChange} numberOfItems={numberOfItems} maxItemsOnOnePage={maxNumOfItemsOnPage}/>
        <RadioSeekerType onChangeTrigger={handleServiceTypeChange} />
      </div>

      <BookingList bookingsArr={bookingArr}/>
      
    </section>
  )
}

export default BookingListDisplayBody