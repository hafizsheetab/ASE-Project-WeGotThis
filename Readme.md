# Instruction
1. `bash build.sh`
2. `docker compose up` 
## Profiles
1. backend: only the backend will run  `docker compose --profile backend up` helps with development of frontend
2. infra: prepare the infrastructure required for backend development `docker compose --profile infra up` helps with development of backend


## Bugs
- Every time when log in, you can actual see the "Forgot Password" Page -> FIXED
- TODO has Review? ->  /// TODO: CHECK IF booking.offer.hasReview & (booking.offer.id == context.user.id) see BookingList.tsx


## TODO
- Booking Responsiveness -> Elisa
- Dates Format still not appliable? Home - Offer View - Booking -> Xiaying


## Missing Integration
- Delete Offer API 
- Store City Code in Location (Location is hard to sort without any proper standard formats, such as city code)
- Withdraw API Function? -> BookingCard.tsx

## Backend
1. Allow Registration with 2 character name & surname
2. Forgot Password 5xx error -> cannot reset
3. Change Error Message to more understandable ones