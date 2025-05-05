# Instruction
1. `bash build.sh`
2. `docker compose up` 
## Profiles
1. backend: only the backend will run  `docker compose --profile backend up` helps with development of frontend
2. infra: prepare the infrastructure required for backend development `docker compose --profile infra up` helps with development of backend


## Bugs /TODO 
- Location is hard to sort without any proper standard formats, such as city code
- Every time when log in, you can actual see the "Forgot Password" Page
- Dates Format still not appliable? Home - Offer View - Booking
- TODO has Review? ->  /// TODO: CHECK IF booking.offer.hasReview & (booking.offer.id == context.user.id) see BookingList.tsx
- Withdraw API Function? -> BookingCard.tsx

- Booking Responsiveness -> Elisa