import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import ReviewCards from "./ReviewCards";
import { ReviewResponse } from "../../shared/Types";
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
  const [filteredArray, setReviews] = useState<ReviewResponse[]>([])

  useEffect(() =>{
    filter.allSelected? setReviews(array) : 
    setReviews(array.filter((item) =>
      filter.values.includes(Math.round(item.rating))))
  }, [filter, array])

  return (
    <Stack gap={4} sx={{mt:5}}>   
      <PaginationControlled  header="Latest Reviews" maxItemsOnOnePage={25} numberOfItems={filteredArray.length}
                handleFilterChange={(newVal) => setFilter(newVal)} handleSelectAll={(newVal) => setFilter(newVal)}/>
        
        <Stack gap={4}>
            {filteredArray.length > 0 ? (
                filteredArray.map((item) => (
                  <ReviewCards
                    key={`${item.user.id}-${item.time}`} // ✅ safer key if `id` exists
                    review={item}
                    profileImg={item.user.imageUrl}
                  />
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{ py: 15, textAlign: "center", width: "100%" }}
                  color="text.secondary"
                >
                  No reviews.
                </Typography>
            )}
      </Stack>

    </Stack>


  )
}

export default ReviewsList