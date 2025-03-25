import React from 'react'
import BookingCard from './BookingCard';

interface Booking {
    id : string;
    title : string;
    requestedOn : string;
    type : string;
    availability : string;
    location : string;
    originalPrice : number; 
    currency : string;
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
    <section>
        {bookingsArr.map((booking) => 
            <BookingCard 
            key={booking.offerId}
            title={booking.title}
            requestedOn={booking.requestedOn}
            type={booking.type}
            availability={booking.availability}
            location={booking.location}
            originalPrice={booking.originalPrice}
            currency={booking.currency}
            newPrice={booking.newPrice}
          />
          )}
    </section>
  )
}

export default BookingList