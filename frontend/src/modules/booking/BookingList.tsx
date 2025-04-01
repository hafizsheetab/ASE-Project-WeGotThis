import React from 'react'
import BookingCard from './BookingCard';
import { Divider, Stack } from '@mui/material';

interface Booking {
    id : string;
    title : string;
    requestedOn : string;
    type : string;
    availability : string;
    location : string;
    originalPrice : number; 
    priceMode : number;
    newPrice? : number;
    offerId : string;
    createdUserId : string;
    requestedUserId : string;
}

type BookingListProps = {
    bookingsArr : Booking[]
}

const BookingList : React.FC<BookingListProps> = ({bookingsArr}) => {
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />}>
        {bookingsArr.map((booking) => 
            <BookingCard 
            key={booking.offerId}
            title={booking.title}
            requestedOn={booking.requestedOn}
            type={booking.type}
            availability={booking.availability}
            location={booking.location}
            originalPrice={booking.originalPrice}
            priceMode={booking.priceMode}
            newPrice={booking.newPrice}
          />
          )}
    </Stack>
  )
}

export default BookingList