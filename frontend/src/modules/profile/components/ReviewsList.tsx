import { Stack, Typography } from "@mui/material"
import { useState } from "react";
import ReviewCards from "./ReviewCards";
import { ReviewResponse } from "../../shared/Types";
import { getDateTimeString } from "../../shared/services";
import PaginationControlled from "../../shared/components/PaginationControls";

type ReviewsListProps = {
  array : Array<ReviewResponse>
}

const ReviewsList: React.FC<ReviewsListProps> = ({array}) => {
  const [filter, setFilter] = useState({
    active: false,
    values: [] as number[],
    allSelected: true
  })

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  return (
    <Stack gap={4} sx={{mt:5}}>   
      <PaginationControlled  header="Latest Reviews" maxItemsOnOnePage={25} numberOfItems={23} onPaginationClick={handlePaginationChange} handleFilterChange={(newVal) => setFilter(newVal)} handleSelectAll={(newVal) => setFilter(newVal)}/>
        
        <Stack gap={4}>
          {filter.allSelected && array.length > 0 ? (
            array.map((item) => (
              <ReviewCards key={`${getDateTimeString(item.time)}-${item.user.firstName} ${item.user.lastName}`} review={item} profileImg={item.user.imageUrl} />
            ))
          ) : (
            (() => {
              const filteredArray = array.filter((item) =>
                filter.values.includes(Math.round(item.rating))
              );

              return filteredArray.length > 0 ? (
                filteredArray.map((item) => (
                  <ReviewCards key={`${getDateTimeString(item.time)}-${item.user.firstName} ${item.user.lastName}`} review={item} profileImg={item.user.imageUrl} />
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{ py: 15, textAlign: "center", width: "100%" }}
                  color="text.secondary"
                >
                  No reviews.
                </Typography>
              );
            })()
          )}
        </Stack>

    </Stack>


  )
}

export default ReviewsList