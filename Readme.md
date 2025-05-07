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

## Backend / Integration
1. Allow Registration with 2 character name & surname
2. Forgot Password 5xx error -> cannot reset
3. Change Error Message to more understandable ones
4. Delete Offer API
5. Create At for Offers?
6. Get User by ID? e.g. offer -> view user -> undefined name & error msg
7. API for getAllOffersFromUser(userID)
8. API Give Review doesnt work
9. Properties or at least a way to check: 
    ownerConfirmedService: boolean
    requesterConfirmedService: boolean
    ownerReviewMissing: boolean
    requestReviewMissing: boolean

    => It is needed so I can do in the frontend the check if review is available and ONLY if ownerConfirmedService & requesterConfirmedService it goes to the next step of review

## Frontend
1. Create At in OfferListCard -> After Backend done
2. Integrate Delete Offer API -> OfferList Menu
3. Sorting Location -> Backend Improvement
4. Improve Default values in sortings -> no date value and price range in the beginning
5. Change getMyOffers in PublicProfileBody.tsx to getAllOffersFromUser(userID) -> Wait for backend
6. Check if Review Dialog closes after bug in API GiveReview is fixed